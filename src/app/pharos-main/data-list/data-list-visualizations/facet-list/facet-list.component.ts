import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PathResolverService} from '../../../../pharos-services/path-resolver.service';
import {Facet} from '../../../../models/facet';

/**
 * panel to show selected facets or queries, and remove them
 */
@Component({
  selector: 'pharos-facet-list',
  templateUrl: './facet-list.component.html',
  styleUrls: ['./facet-list.component.scss']
})

export class FacetListComponent implements OnInit, OnDestroy {
  /**
   * list of selected facets
   */
  @Input() facets: Facet[];

  /**
   * set up route watching
   * @param {ActivatedRoute} _route
   * @param {PathResolverService} pathResolverService
   */
  constructor(private _route: ActivatedRoute,
              private pathResolverService: PathResolverService) {
  }

  /**
   * set up subscriptions for fetching facets and watching route changes
   */
  ngOnInit() {
    console.log(this);
    this.facets = this.pathResolverService.getFacetsAsObjects();
    /*this.pathResolverService.facets$.subscribe(res => {
      console.log(res);
      this.facets = res;
    });*/
    this._route.queryParamMap.subscribe(res => {
      console.log(res);
     // this.pathResolverService.mapToFacets(res)
      this.facets = this.pathResolverService.getFacetsAsObjects();

    });
  }

  /**
   * remove a specific facet and all selected fields
   * @param facet
   */
  removefacetFamily(facet: any): void {
    this.pathResolverService.removefacetFamily(facet);
    this.pathResolverService.navigate();
  }

  /**
   * remove single field from a facet
   * @param facet
   * @param {string} field
   */
  removeField(facet: any, field: string): void {
    this.pathResolverService.removeField(facet, field);
    this.pathResolverService.navigate();
  }

  /**
   * clear all queries/facets
   */
  removeAll(): void {
    this.pathResolverService.removeAll();
  }

  ngOnDestroy(): void {
    this.facets = [];
   // this.removeAll();
  }
}