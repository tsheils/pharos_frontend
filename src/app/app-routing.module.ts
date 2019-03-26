import { NgModule } from '@angular/core';
import {PharosDashboardComponent} from './pharos-dashboard/pharos-dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {AboutPageComponent} from './about-page/about-page.component';
import {FaqPageComponent} from './faq-page/faq-page.component';
import {ApiPageComponent} from './api-page/api-page.component';
import {StructureSearchPageComponent} from './structure-search-page/structure-search-page.component';
import {SequenceSearchPageComponent} from './sequence-search-page/sequence-search-page.component';



const ROUTES: Routes = [
  {
    path: 'index',
    component: PharosDashboardComponent
  },
  { path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  },
  {
    path: 'about',
    component: AboutPageComponent
  },
  { path: 'help',
    redirectTo: '/about',
    pathMatch: 'full'
  },
  {
    path: 'structure',
    component: StructureSearchPageComponent
  },
  { path: 'sketcher',
    redirectTo: '/structure',
    pathMatch: 'full'
  },
  {
    path: 'sequence',
    component: SequenceSearchPageComponent
  },
  {
    path: 'faq',
    component: FaqPageComponent
  },
  {
    path: 'api',
    component: ApiPageComponent
  },
  {
    path: 'targets',
    loadChildren: './pharos-main/pharos-main.module#PharosMainModule',
    data: { path: 'targets' }
  }, {
    path: 'diseases',
    loadChildren: './pharos-main/pharos-main.module#PharosMainModule',
    data: { path: 'diseases' }
  }, {
    path: 'ligands',
    loadChildren: './pharos-main/pharos-main.module#PharosMainModule',
    data: { path: 'ligands' }
  },
  {
    path: 'topics',
    loadChildren: './pharos-main/pharos-main.module#PharosMainModule',
    // todo: the redirect when changing from targets to topics loads the new module
// todo: at the same time, the current view is reacting to the change in data and loading the topic table component, but not the module
// todo: solution: ????? 1. merge topic table back into main module 2. aggressively destroy view on data change 3. ???
//    loadChildren: './pharos-topics/pharos-topics.module#PharosTopicsModule',
    data: { path: 'topics' }
  },
  {
    path: 'search',
    loadChildren: './pharos-main/pharos-main.module#PharosMainModule',
    data: { path: 'search' }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES,{
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: "reload",
      scrollOffset: [0, 120]
      })
  ],
  providers: [],
  entryComponents: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
