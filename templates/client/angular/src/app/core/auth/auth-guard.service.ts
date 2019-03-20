import {Injectable, isDevMode} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public authService: AuthService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean | Promise<boolean> {
    return this.checkLogin();
  }

  checkLogin(): Promise<boolean> {
    const authService = this.authService;
    return Promise.resolve(
      authService.loadProfile().then(profile => {
        if (profile) {
          return true;
        }
        this.router.navigate(['/pages/error']);
        return false;
      })
    );
  }

}
