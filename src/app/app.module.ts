import {Inject, NgModule, PLATFORM_ID} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AuthModule} from './auth/auth.module';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {NcatsHeaderModule} from './tools/ncats-header/ncats-header.module';
import {PharosLoadingSpinnerModule} from './tools/pharos-loading-spinner/pharos-loading-spinner.module';
import {PharosFooterComponent} from './tools/pharos-footer/pharos-footer.component';
import {ScrollToTopComponent} from './tools/scroll-to-top/scroll-to-top.component';
import {MaterialModule} from '../assets/material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TransferHttpCacheModule} from '@nguniversal/common';
import {GraphQLModule} from './graphql.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ServiceWorkerModule} from "@angular/service-worker";
import {MarkdownModule} from "ngx-markdown";
import ProtVistaManager      from "protvista-manager";
import ProtVistaNavigation   from "protvista-navigation";
import ProtVistaSequenceLogo from "kelleher-sequence-logo";
import {isPlatformBrowser} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    PharosFooterComponent,
    ScrollToTopComponent
  ],
  imports: [
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MaterialModule,
    BrowserModule.withServerTransition({ appId: 'pharos' }),
    TransferHttpCacheModule,
    AppRoutingModule,
    RouterModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AuthModule,
    NcatsHeaderModule,
    PharosLoadingSpinnerModule,
    GraphQLModule,
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Inject(PLATFORM_ID) private platformID: Object) {
    if (isPlatformBrowser(this.platformID)) {
      window.customElements.define('protvista-manager', ProtVistaManager);
      window.customElements.define('protvista-navigation', ProtVistaNavigation);
      window.customElements.define('protvista-sequence-logo', ProtVistaSequenceLogo);
    }
  }
}
