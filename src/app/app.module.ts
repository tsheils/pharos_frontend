import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../assets/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LoadingService } from './pharos-services/loading.service';
import { AppRoutingModule } from './app-routing.module';
import { PharosApiService } from './pharos-services/pharos-api.service';
import { ResponseParserService } from './pharos-services/response-parser.service';
import { EnvironmentVariablesService } from './pharos-services/environment-variables.service';
import { PathResolverService } from './pharos-services/path-resolver.service';
import { FacetRetrieverService } from './pharos-main/services/facet-retriever.service';
import { ToiDashboardComponent } from './pharos-dashboard/toi-dashboard/toi-dashboard.component';
import { ToiCardComponent } from './pharos-dashboard/toi-card/toi-card.component';
import { PharosDashboardComponent } from './pharos-dashboard/pharos-dashboard.component';
import { SearchCardComponent } from './pharos-dashboard/search-card/search-card.component';
import {SuggestApiService} from './tools/search-component/suggest-api.service';
import {SharedModule} from './shared/shared.module';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    ToiDashboardComponent,
    ToiCardComponent,
    PharosDashboardComponent,
    SearchCardComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    PharosApiService,
    PathResolverService,
    ResponseParserService,
    LoadingService,
    EnvironmentVariablesService,
    FacetRetrieverService,
    SuggestApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
