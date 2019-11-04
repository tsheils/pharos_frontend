import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneSummaryComponent } from './gene-summary.component';
import {TESTTARGET} from '../../../../../../../test/test-target';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {ActivatedRoute} from '@angular/router';
import {MockActivatedRoute} from '../../../../../../../test/mock-activate-route';

describe('GeneSummaryComponent', () => {
  let component: GeneSummaryComponent;
  let fixture: ComponentFixture<GeneSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneSummaryComponent ],
      imports: [
        ApolloTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneSummaryComponent);
    component = fixture.componentInstance;
    component.target = TESTTARGET;
    component.data = {};
    component.data.geneSummary = [{text: 'this is an awesome gene'}];

   // component.geneSummary = 'this is a gene';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});