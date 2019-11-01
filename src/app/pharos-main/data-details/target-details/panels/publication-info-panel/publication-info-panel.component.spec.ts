import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationInfoPanelComponent } from './publication-info-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {GenericTableModule} from '../../../../../tools/generic-table/generic-table.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRoute} from '@angular/router';
import {MockActivatedRoute} from '../../../../../../../test/mock-activate-route';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('PublicationInfoPanelComponent', () => {
  let component: PublicationInfoPanelComponent;
  let fixture: ComponentFixture<PublicationInfoPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PublicationInfoPanelComponent
      ],
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        GenericTableModule,
        ApolloTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationInfoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
