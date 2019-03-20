import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignOutAlt, faSignInAlt, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';

import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import {HasAnyRoleDirective, ToggleFullscreenDirective} from "./directives";


@NgModule({
  exports: [
    CommonModule,
    FooterComponent,
    NavbarComponent,
    ToggleFullscreenDirective,
    HasAnyRoleDirective,
    NgbModule,
    TranslateModule,
    FontAwesomeModule
  ],
  imports: [
    RouterModule,
    CommonModule,
    NgbModule,
    TranslateModule,
    FontAwesomeModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    ToggleFullscreenDirective,
    HasAnyRoleDirective
  ]
})
export class SharedModule {
  constructor() {
    // Add an icon to the library for convenient access in other components
    library.add(faSignOutAlt);
    library.add(faSignInAlt);
    library.add(faUser);
    library.add(faUserCircle);
  }
}
