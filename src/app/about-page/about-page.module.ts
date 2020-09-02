import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AboutPageComponent} from "./about-page.component";
import {SharedModule} from "../shared/shared.module";
import {CommonToolsModule} from "../tools/common-tools.module";
import {MarkdownModule} from "ngx-markdown";


const routes: Routes = [
  {
    path: '',
    component: AboutPageComponent
  }
];

@NgModule({
  declarations: [AboutPageComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule, SharedModule, CommonToolsModule, MarkdownModule
    ]
})
export class AboutPageModule { }
