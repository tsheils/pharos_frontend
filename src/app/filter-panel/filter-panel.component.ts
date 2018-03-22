import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ResponseParserService} from "../services/response-parser.service";
import {Facet} from "../models/facet";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs/Subject";
import {environment} from "../../environments/environment.prod";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'pharos-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterPanelComponent implements OnInit {
  facetsList: any;
  facets: Facet[];
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private http: HttpClient,
              private ref: ChangeDetectorRef,
              private _route: ActivatedRoute,
              private responseParserService: ResponseParserService) { }

  ngOnInit() {
    this.facetsList = environment.functions[this._route.snapshot.url[0].path].facets;
    this.responseParserService.facetsData$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res=> {
      this.facetsList.forEach(name => res.filter(facet => facet.name === name ? this.facets.push(facet) : false));
      this.ref.markForCheck();
  });
  }

  trackByFn(index: string, item: Facet) {
    return item.name;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
