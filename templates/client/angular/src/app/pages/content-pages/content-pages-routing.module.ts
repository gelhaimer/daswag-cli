import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CallbackComponent} from "./callback/callback.component";
import {HomePageComponent} from "../full-pages/home/home-page.component";
import {ErrorPageComponent} from "./error/error-page.component";


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'callback',
        component: CallbackComponent,
        data: {
          title: 'Loading'
        }
      },
      {
        path: 'error',
        component: ErrorPageComponent,
        data: {
          title: 'Error'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPagesRoutingModule { }
