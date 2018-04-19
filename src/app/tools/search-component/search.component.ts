import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {SuggestApiService} from './suggest-api.service';
import {Observable} from 'rxjs/Observable';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'pharos-search-component',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
@Input() placeholderStr?: string;

  typeaheadCtrl: FormControl = new FormControl();
  filteredGroups: Observable<any>;
  groups: any[] = [];
  constructor(
              private suggestApiService: SuggestApiService) {
  }
  ngOnInit() {
    if (!this.placeholderStr) {
      this.placeholderStr = 'Search for targets (e.g., \'ITK\') or diseases (e.g., \'asthma\')';
    }
    this.filteredGroups = this.typeaheadCtrl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(term => this.suggestApiService.search(term),
        ));
  }

  search(): void {
    console.log(this.typeaheadCtrl.value);
  }
}