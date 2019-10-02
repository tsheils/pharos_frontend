import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {APP_BASE_HREF} from '@angular/common';
import {LoadingService} from './pharos-services/loading.service';
import {PathResolverService} from './pharos-services/path-resolver.service';
import {FacetRetrieverService} from './pharos-main/data-list/filter-panel/facet-retriever.service';
import {PharosApiService} from './pharos-services/pharos-api.service';
import {SuggestApiService} from './tools/search-component/suggest-api.service';
import {NcatsHeaderComponent} from './tools/ncats-header/ncats-header.component';
import {NcatsHeaderModule} from './tools/ncats-header/ncats-header.module';
import {PharosLoadingSpinnerModule} from './tools/pharos-loading-spinner/pharos-loading-spinner.module';
import {ScrollToTopComponent} from './tools/scroll-to-top/scroll-to-top.component';
import {PharosFooterComponent} from './tools/pharos-footer/pharos-footer.component';
import {AngularFirestore} from '@angular/fire/firestore';
import {FirestoreStub} from '../../test/firestore-stub';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        NcatsHeaderModule,
        PharosLoadingSpinnerModule
      ],
      declarations: [
        ScrollToTopComponent,
        PharosFooterComponent,
        AppComponent
      ],
      providers: [
        PharosApiService,
        PathResolverService,
        LoadingService,
        FacetRetrieverService,
        SuggestApiService,
        { provide: AngularFirestore, useValue: FirestoreStub },
        {provide: APP_BASE_HREF, useValue: '/' }
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  /*it(`should have as title 'Pharos'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Pharos');
  }));*/
});
