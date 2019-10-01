import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {PharosHomeComponent} from './pharos-home/pharos-home.component';
import {APP_BASE_HREF} from '@angular/common';
import {LoadingService} from './pharos-services/loading.service';
import {PathResolverService} from './pharos-services/path-resolver.service';
import {FacetRetrieverService} from './pharos-main/data-list/filter-panel/facet-retriever.service';
import {PharosApiService} from './pharos-services/pharos-api.service';
import {SuggestApiService} from './tools/search-component/suggest-api.service';
import {ApiPageComponent} from './api-page/api-page.component';
import {AboutPageComponent} from './about-page/about-page.component';
import {FaqPageComponent} from './faq-page/faq-page.component';
import {DataTypesPanelComponent} from './pharos-home/data-types-panel/data-types-panel.component';
import {AboutPanelComponent} from './pharos-home/about-panel/about-panel.component';
import {NewsPanelComponent} from './pharos-home/news-panel/news-panel.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule
      ],
      declarations: [
        AppComponent,
        PharosHomeComponent,
        ApiPageComponent,
        AboutPageComponent,
        FaqPageComponent,
        DataTypesPanelComponent,
        AboutPanelComponent,
        NewsPanelComponent

      ],
      providers: [
        PharosApiService,
        PathResolverService,
        LoadingService,
        FacetRetrieverService,
        SuggestApiService,
        {provide: APP_BASE_HREF, useValue: '/' }
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Pharos'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Pharos');
  }));
});
