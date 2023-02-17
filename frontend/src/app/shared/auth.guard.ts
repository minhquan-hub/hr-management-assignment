import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem('user')) {
      const user = localStorage.getItem('user');
      const userData = user && JSON.parse(user);

      if (
        route.data['roles'] &&
        route.data['roles'].indexOf(userData.role) === -1
      ) {
        this.router.navigate([this.router.url]);
        return false;
      }

      return true;
    }
    return this.authService.isUserLoggedIn;
  }
}
