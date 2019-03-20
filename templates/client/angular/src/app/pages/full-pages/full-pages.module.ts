import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { FullPagesRoutingModule } from "./full-pages-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {ProfilePageComponent} from "./profile/profile-page.component";
import {HomePageComponent} from "./home/home-page.component";


@NgModule({
  imports: [
    CommonModule,
    FullPagesRoutingModule,
    FormsModule,
    NgbModule
  ],
  declarations: [
    ProfilePageComponent,
    HomePageComponent
  ]
})
export class FullPagesModule { }
