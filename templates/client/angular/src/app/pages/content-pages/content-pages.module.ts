import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { ContentPagesRoutingModule } from "./content-pages-routing.module";
import {CallbackComponent} from "./callback/callback.component";
import {ErrorPageComponent} from "./error/error-page.component";


@NgModule({
    imports: [
        CommonModule,
        ContentPagesRoutingModule,
        FormsModule        
    ],
    declarations: [
      CallbackComponent,
      ErrorPageComponent
    ]
})
export class ContentPagesModule { }
