import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class CanActivateViaAuthGaurdService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {

    if (!this.authService.isUserLoggedIn) {
      this.authService.redirectUrl = state.url;
      this.router.navigate(['/Login']);
      return false;
    }
    else {
     // this.router.navigate([state.url]);
      return true;
    }
  }
}
