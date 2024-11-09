import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.secure(next, state);
    }
    canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.secure(next, state);
    }

    private async secure(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        try {
            const IS_LOGGED_IN = this.authService.isUserLoggedIn();

            if (!IS_LOGGED_IN) {
                this.authService.logout();

                return IS_LOGGED_IN;
            } else {
                return true;
            }
        } catch (e) {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
