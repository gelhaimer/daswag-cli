import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap'
import { of } from 'rxjs/observable/of';
import { timer } from 'rxjs/observable/timer';

import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Logger } from '../services/logger.service';
import {UserService} from "../services";
import {Observable, Subject} from "rxjs";

const log = new Logger('AuthService');

(window as any).global = window;

@Injectable()
export class AuthService {

  refreshSubscription: any;
  private profile: any;
  private currentProfileSubject = new Subject<any>();

  auth0 = new auth0.WebAuth({
    clientID: environment.auth.clientID,
    domain: environment.auth.domain,
    responseType: 'token id_token',
    audience: environment.auth.audience,
    redirectUri: environment.auth.callbackUrl,
    returnTo: environment.auth.returnTo,
    scope: environment.auth.scope
  });

  constructor(public router: Router, private $localStorage: LocalStorageService, private userService: UserService) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      console.log('AUTH in progress');
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.loadProfile();
        this.router.navigate(['/dashboard']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  public loadProfile(force?: boolean): Promise<any> {
    if (force === true) {
      this.profile = undefined;
    }

    // check and see if we have retrieved the userIdentity data from the server.
    // if we have, reuse it by immediately resolving
    if (this.profile) {
      return Promise.resolve(this.profile);
    }

    log.info("Loading user profile");
    return new Promise((resolve, reject) => {
      const accessToken = this.$localStorage.retrieve('access_token');
      if (!accessToken) {
        throw new Error('Access token must exist to fetch profile');
      }
      this.auth0.client.userInfo(accessToken, (err, profile) => {
        if (profile) {
          console.log(profile);
          this.profile = profile;
          this.currentProfileSubject.next(profile);
          resolve(profile);
        } else if(err) {
          this.profile = null;
          this.currentProfileSubject.next(null);
          log.error(err);
          reject(err);
        }
      });
    });
  }

  public getCurrentProfile(): Observable<any> {
    return this.currentProfileSubject.asObservable();
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

    // If there is a value on the `scope` param from the authResult,
    // use it to set scopes in the session for the user. Otherwise
    // use the scopes as requested. If no scopes were requested,
    // set it to nothing
    const scopes = authResult.scope || environment.auth.scope || '';

    this.$localStorage.store('access_token', authResult.accessToken);
    this.$localStorage.store('id_token', authResult.idToken);
    this.$localStorage.store('expires_at', expiresAt);
    this.$localStorage.store('scopes', JSON.stringify(scopes));

    this.scheduleRenewal();
  }

  public logout(): void {
    this.profile = null;
    // Remove tokens and expiry time from localStorage
    this.$localStorage.clear('access_token');
    this.$localStorage.clear('id_token');
    this.$localStorage.clear('expires_at');
    this.$localStorage.clear('scopes');
    this.currentProfileSubject.next(null);
    this.unscheduleRenewal();
    // Go back to the home route
    this.auth0.logout();
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(this.$localStorage.retrieve('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

  public hasAnyRolesDirect(roles: Array<string>): boolean {
    const profileRoles = this.getProfileRoles();
    if(!profileRoles) {
      return false;
    }
    for (let i = 0; i < roles.length; i++) {
      if (profileRoles.includes(roles[i])) {
        return true;
      }
    }

    return false;
  }

  public hasAnyRoles(roles: Array<string>): Promise<boolean> {
    return Promise.resolve(this.hasAnyRolesDirect(roles));
  }

  public renewToken() {
    log.info('Ask for token renew');
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        log.error(`Could not get a new token (${err.error}: ${err.error_description}).`);
      } else {
        this.setSession(result);
      }
    });
  }

  public scheduleRenewal() {
    if(!this.isAuthenticated()) return;
    this.unscheduleRenewal();

    const expiresAt = JSON.parse(this.$localStorage.retrieve('expires_at'));
    const source = of(expiresAt).mergeMap(
      expiresAt => {

        const now = Date.now();
        // Use the delay in a timer to
        // run the refresh at the proper time
        return timer(Math.max(1, expiresAt - now));
      });

    // Once the delay time from above is
    // reached, get a new JWT and schedule
    // additional refreshes
    this.refreshSubscription = source.subscribe(() => {
      this.renewToken();
      this.scheduleRenewal();
    });
  }

  public unscheduleRenewal() {
    if(!this.refreshSubscription) return;
    this.refreshSubscription.unsubscribe();
  }

  private getProfileRoles() {
   if(!this.isAuthenticated() || !this.profile || !this.profile[environment.rolesNamespaces]) {
     return null;
   }
   return this.profile[environment.rolesNamespaces]
  }

  getPicture() {
    return this.profile ? this.profile.picture : null;
  }
}
