import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AaSequencePanelComponent } from './aa-sequence-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {TESTDISEASE} from '../../../../../../../test/test-disease';
import {TESTTARGET} from '../../../../../../../test/test-target';
import {By} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {ActivatedRoute} from '@angular/router';
import {MockActivatedRoute} from '../../../../../../../test/mock-activate-route';
import {RouterTestingModule} from '@angular/router/testing';

describe('AaSequencePanelComponent', () => {
  let component: AaSequencePanelComponent;
  let fixture: ComponentFixture<AaSequencePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        ApolloTestingModule,
        RouterTestingModule
      ],
      declarations: [
        AaSequencePanelComponent
      ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AaSequencePanelComponent);
    component = fixture.componentInstance;
    component.apiSources = [{label: '', field: '', description: ''}];
    component.data = {
      object: TESTTARGET,
      references: [],
      sequence: [
        {text: 'GATTACA'}
      ]
    };
    // component.aasequence = [];
    component.loading = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
