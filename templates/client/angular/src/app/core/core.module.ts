import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthGuardService, AuthService, RoleGuardService} from "./auth";
import {UserService} from "./services";
import {ErrorHandlerInterceptor, AuthExpiredInterceptor, AuthInterceptor} from "./interceptors";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    UserService,
    AuthGuardService,
    RoleGuardService,
    AuthService
  ],
  declarations: [
  ]
})
export class CoreModule { }
