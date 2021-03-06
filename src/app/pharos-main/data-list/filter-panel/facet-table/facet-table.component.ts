import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';
import {Facet, Field} from '../../../../models/facet';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {PathResolverService} from '../path-resolver.service';
import {SelectedFacetService} from '../selected-facet.service';
import {PharosApiService} from '../../../../pharos-services/pharos-api.service';
import {HighlightPipe} from '../../../../tools/search-component/highlight.pipe';

/**
 * table to display selectable fields
 */
@Component({
  selector: 'pharos-facet-table',
  templateUrl: './facet-table.component.html',
  styleUrls: ['./facet-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacetTableComponent implements OnInit, OnDestroy {

  /**
   * facet to display fields of
   */
  @Input() facet: Facet;

  @Input() values: Field[];
  @Input() path: string;

  @Input() popup = false;
  @Input() popupFields: string[];
  @Output() popupFieldsChange = new EventEmitter<string[]>();

  /**
   * data source of filters to display in the table
   * @type {MatTableDataSource<any>}
   */
  dataSource = new MatTableDataSource<any>([]);

  /**
   * data source to show filtered results based on text search
   */
  filteredDataSource = new MatTableDataSource<any>([]);
  /**
   * selection model to track selected filters
   * @type {SelectionModel<string>}
   */
  filterSelection = new SelectionModel<string>(true, []);

  /**
   * facet selection fields to display
   * @type {string[]}
   */
  displayColumns: string [] = ['select', 'name', 'count'];

  /**
   * object fields headings to track and show
   * @type {string[]}
   */
  fieldColumns: string [] = ['name', 'count'];

  /**
   * unsubscribe subject
   * @type {Subject<any>}
   */
  private ngUnsubscribe: Subject<any> = new Subject();

  /**
   * flag to show or hide the spinner for loading all facet options
   */
  loading = false;
  /**
   * boolean to track facets selection - without this flag, the facet selection triggers a constant change
   * @type {boolean}
   */
  propogate = true;

  /**
   * the text string what someone is using to find facet options
   */
  searchText = '';

  /**
   * helps highlight the search terms. included as object since I couldn't get the module to share to use the pipe directly :(
   */
  private highlight: HighlightPipe = new HighlightPipe();

  /**
   * add route and change tracking dependencies
   * @param _route
   * @param router
   * @param changeRef
   * @param selectedFacetService
   * @param {PathResolverService} pathResolverService
   */
  constructor(private _route: ActivatedRoute,
              private pharosApiService: PharosApiService,
              private router: Router,
              private changeRef: ChangeDetectorRef,
              private selectedFacetService: SelectedFacetService,
              private pathResolverService: PathResolverService) {
  }

  /**
   * retrieve and set facet values, subscribe to changes
   */
  ngOnInit() {
    this.router.events
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalize the component
        if (e instanceof NavigationEnd) {
          // update field values
          this.dataSource.data = this.facet.values;
          this.populateFilteredData();
          // update selected fields
          this.mapSelected();
          this.changeRef.markForCheck();
        }
      });
    // update field values
    this.dataSource.data = this.facet.values;
    this.populateFilteredData();
    // update selected fields
    this.mapSelected();

    /**
     * this changes the facets that are mapped to the url path in the service
     */
    this.filterSelection.changed
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(change => {
        if (!this.popup) {
          if (this.propogate === true) {
            this.selectedFacetService.setFacets({name: this.facet.facet, change});
            const queryParams = this.selectedFacetService.getFacetsAsUrlStrings();
            this.pathResolverService.navigate(queryParams, this._route, this.selectedFacetService.getPseudoFacets());
          }
        } else {
          this.popupFieldsChange.emit(change.source.selected);
        }
      });

    this.selectedFacetService.facets$.subscribe(facetMap => {
      this.mapSelected();
    });
  }

  mapSelected() {
    if (this.popup) {
      this.filterSelection.select(...this.popupFields);
    } else {
      const selected: Facet = this.selectedFacetService.getFacetByName(this.facet.facet);
      if (selected) {
        this.propogate = false;
        this.filterSelection.select(...selected.values.map(val => val.name));
        this.propogate = true;
      } else {
        this.propogate = false;
        this.filterSelection.clear();
        this.propogate = true;
      }
    }
  }

  /**
   * detects scrolling of the options div
   * @param event
   */
  scrollDetected(event) {
    if (event.target.scrollHeight - event.target.offsetHeight - event.target.scrollTop <= 5) {
      if (this.facet.values.length < this.facet.count) {
        this.fetchAllFilterOptions();
      }
    }
  }

  /**
   * show underline of the searchText
   * @param rowText
   */
  highlightText(rowText: string) {
    if (this.searchText.length == 0) {
      return rowText;
    }
    return this.highlight.transform(rowText, this.searchText);
  }

  /**
   * fetches all the filter options for the component's facet
   */
  fetchAllFilterOptions() {
    this.loading = true;
    this.pharosApiService.getAllFacetOptions(
      this._route.snapshot.data.path || this.path,
      this._route.snapshot.queryParamMap,
      this.facet.facet,
      this.facet.count).subscribe({
      next:
        res => {
          this.facet = res.data.results.facets.find(resfacet => resfacet.facet === this.facet.facet);
          this.dataSource.data = this.facet.values;
          this.populateFilteredData();
          this.mapSelected();
          this.loading = false;
        }, error: e => {
        throw(e);
      }
    });
  }

  /**
   * track facet changes to avoid unnecessary changes
   * @param index
   * @param {Field} item
   * @returns {string}
   */
  trackByFunction(index, item: Field) {
    return item.name;
  }

  /**
   * filter facet options by searchText
   * @param {string} searchText
   */
  filterFacet(searchText: string): void {
    this.searchText = searchText;
    if (searchText.length > 0 && this.facet.values.length < this.facet.count) {
      this.fetchAllFilterOptions();
    }
    this.populateFilteredData();
  }

  /**
   * populates the filteredDataSource that is being shown
   */
  private populateFilteredData() {
    if (this.searchText.length === 0) {
      this.filteredDataSource.data = this.dataSource.data;
      return;
    }
    this.filteredDataSource.data = this.dataSource.data.filter(row => {
      const rowname = (row.value || row.name).toLowerCase();
      return rowname.indexOf(this.searchText.toLowerCase()) > -1;
    });
  }

  isIndeterminate(row: any) {
    const selected: Facet = this.selectedFacetService.getFacetByName(this.facet.facet);
    if (selected) {
      if (selected.values.map(f => f.name).includes(row.name)) {
        return false;
      }
      let found = false;
      selected.upSets.forEach(set => {
        if (set.inGroup.includes(row.name)) {
          found = true;
        }
      });
      return found;
    }
    return false;
  }

  /**
   * function to unubscribe on destroy
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

