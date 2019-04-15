import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationInfoPanelComponent } from './publication-info-panel.component';

describe('PublicationInfoPanelComponent', () => {
  let component: PublicationInfoPanelComponent;
  let fixture: ComponentFixture<PublicationInfoPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationInfoPanelComponent ]
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
