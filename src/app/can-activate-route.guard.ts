import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  token:string;
  constructor(private routerService:RouterService, private authenticationService:AuthenticationService) {
    this.token = this.authenticationService.getBearerToken();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return new Promise((resolve, reject) => {
       this.authenticationService.isUserAuthenticated(this.token).then((data) => {
          if(data) {
            resolve(true);
          } else {
            reject(false);
            this.routerService.routeToLogin();
            
          }
        });
      }
    );
  }
}
