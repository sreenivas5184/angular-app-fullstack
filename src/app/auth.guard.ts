import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        console.log('url:::::::::::::' + url);
        return this.verifyLogin(url);
    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const url: string = state.url;
        console.log('url::::::::::::: child' + url);
        if (url !== '/mainHome/education') {
           // alert('You dont have permission to this page please contact Sreenivas 8121166180');
            return true;
        } else {
            return true;
        }
    }

    verifyLogin(url): boolean {
        if (!this.isLoggedIn()) {
            this.router.navigate(['home/login']);
            alert('Please login to continue.');
            return false;
        } else if (this.isLoggedIn()) {
            return true;
        }
    }
    public isLoggedIn(): boolean {
        let status = false;
        if ( localStorage.getItem('isLoggedIn') === 'true') {
          status = true;
        } else {
          status = false;
        }
        return status;
    }
}
