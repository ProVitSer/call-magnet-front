import { CanActivate, ActivatedRouteSnapshot, Router, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(public authService: AuthService, public router: Router,  public toastr: ToastrService, public translate: TranslateService) {}

  canActivate(route: ActivatedRouteSnapshot):boolean {
    const expectedRole = route.data.expectedRole;
    if (!expectedRole.some(r => this.authService.getUserRole().includes(r))) {
        this.router.navigate(['/sm/dashboard']);
    }
    return true;
  }
}
