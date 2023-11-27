import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { LoginResponse, Menu } from 'app/shared/models/login';
import { HttpResponse } from 'app/shared/models/response';
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import {  SetsCookiesData, TokenPayload } from 'app/shared/models/auth';
import { RouteInfo } from 'app/shared/vertical-menu/vertical-menu.metadata';
import { AuthRequestService } from 'app/shared/auth/auth-request.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit, OnDestroy{
  loginForm: FormGroup;
  loginFormSubmitted = false;
  isLoginFailed = false;
  ngDestroy$ = new Subject();
  errorMessage: string = '';
  public showPassword: boolean = false;
  isAlertVisible = true;

  constructor(
    private router: Router, 
    private authService: AuthService,
    private authRequestService: AuthRequestService,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    ) {
  }

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next(true);
    this.ngDestroy$.complete();
  }

  get lf() {
    return this.loginForm.controls;
  }


  initializeLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  
  closeAlert(){
    this.isAlertVisible = false;
  }

  onSubmit() {
    this.loginFormSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });

      const dataToSend = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

    this.authRequestService.signIn(dataToSend).subscribe(
      (res: HttpResponse<LoginResponse>) => {
        const result = res;
        if (result.result && res.hasOwnProperty('data')) {

          localStorage.clear();

          this.isLoginFailed = false;

          this.loginDetailsSetup(result.data);

        } else {

          this.spinner.hide();
          this.errorMessage = 'Что-то пошло не так, просьба обратиться в техническую поддержку';
          this.cdr.markForCheck();

        }
      },
      (e) => {
        this.isAlertVisible = true;
        this.spinner.hide();
        this.errorMessage = e;
        this.isLoginFailed = true;
      })
  }

  private loginDetailsSetup(res: LoginResponse){
    const { accessToken, userRoles, menu } = res;

    const { sub } = jwtDecode(accessToken) as TokenPayload;


    if ( !userRoles && !menu && userRoles.length === 0) {
      this.errorMessage = 'Что-то пошло не так, просьба обратиться в техническую поддержку';
      return;
    }

    if(menu?.length > 0) {
      this.setMenu(menu);
    } else {
      this.router.navigate(['/']);
    }



    const isSetUserData = this.setUserData({ ...res, clientId: sub});

    if (isSetUserData) {
      this.spinner.hide();

      this.router.navigate(['sm/dashboard']);
    } else {
      this.spinner.hide();
      this.errorMessage = 'Что-то пошло не так, попробуйте позже';
    }
  }

  private setMenu(menuData: Menu[]): void {
    let setMenu = [];
    menuData?.forEach((menu) => {
      const route: RouteInfo = {
          path: menu.path,
          title: menu.name,
          icon: menu.icon,
          class: menu?.group?.lines?.length > 0  ? 'has-sub': '',
          badge: menu.badge,
          badgeClass: menu.badgeClass,
          isExternalLink: menu.externalLink,
          submenu:   menu?.group?.lines?.length >0 ? this.changeMenu(menu?.group?.lines) : [],
      }
      setMenu.push(route);
    });


    this.authService.setMenu(setMenu);
  }

  private changeMenu(menuData: Menu[]): RouteInfo[] {
    if(menuData?.length>0){
      return  menuData.map((menu) => {
        const route: RouteInfo = {
            path: menu.path,
            title: menu.name,
            icon: menu.icon,
            class: menu?.group?.lines?.length > 0    ? 'has-sub': '',
            badge: menu.badge,
            badgeClass: menu.badgeClass,
            isExternalLink: menu.externalLink,
            submenu:  menu?.group?.lines?.length>0?this.changeMenu(menu?.group?.lines):[],
        }
        return route;
      });
    }
  }

  private setUserData(data: SetsCookiesData): boolean {

    return this.authService.setCookies(data);

  }
}
