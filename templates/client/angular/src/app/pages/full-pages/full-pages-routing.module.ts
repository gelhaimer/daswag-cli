import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from "./home/home-page.component";
import {ProfilePageComponent} from "./profile/profile-page.component";
import {AuthGuardService, RoleGuardService} from "../../core/auth";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: HomePageComponent,
        data: {
          title: 'Home'
        }
      },
      {
        path: 'profile',
        component: ProfilePageComponent,
        data: {
          title: 'Profile',
          roles: ['ROLE_USER']
        },
        canActivate: [RoleGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule { }
