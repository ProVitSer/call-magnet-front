import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { LoginResponse } from 'app/shared/models/login';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { SetsCookiesData, TokenPayload } from 'app/shared/models/auth';
import { RouteInfo } from 'app/shared/vertical-menu/vertical-menu.metadata';
import { AuthRequestService } from 'app/shared/auth/auth-request.service';
import { BASE_ROLE_MENU, Menu, MENU_BY_PRODUCT_TYPE } from 'app/shared/models/menu';
import { Products } from 'app/shared/models/license';
import { JWTTokenService } from 'app/shared/auth/jwt-token.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    loginFormSubmitted = false;
    isLoginFailed = false;
    ngDestroy$ = new Subject();
    errorMessage = '';
    public showPassword = false;
    isAlertVisible = true;

    constructor(
        private router: Router,
        private authService: AuthService,
        private authRequestService: AuthRequestService,
        private spinner: NgxSpinnerService,
        private cdr: ChangeDetectorRef,
        private fb: FormBuilder,
        private jwtTokenService: JWTTokenService,
    ) {}

    ngOnInit(): void {
        this.onInit();
    }

    ngOnDestroy(): void {
        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    get lf() {
        return this.loginForm.controls;
    }

    private onInit() {
        const token = this.authService.getToken();

        if (token) {
            const tokenExp = this.jwtTokenService.isTokenExpired(token);

            if (!tokenExp) {
                return this.router.navigate(['sm/analytics/calls']);
            }
        }

        this.initializeLoginForm();

        this.router.navigate(['sm/analytics/calls']);
    }

    initializeLoginForm() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });
    }

    closeAlert() {
        this.isAlertVisible = false;
    }

    onSubmit() {
        this.loginFormSubmitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.spinner.show(undefined, {
            type: 'ball-triangle-path',
            size: 'medium',
            bdColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            fullScreen: true,
        });

        const dataToSend = {
            email: this.loginForm.value.email,
            password: this.loginForm.value.password,
        };

        this.authRequestService.signIn(dataToSend).subscribe(
            (res: LoginResponse) => {
                if (res) {
                    localStorage.clear();

                    this.isLoginFailed = false;

                    this.loginDetailsSetup(res);
                } else {
                    this.spinner.hide();
                    this.errorMessage = 'Что-то пошло не так, просьба обратиться в техническую поддержку';
                    this.cdr.markForCheck();
                }
            },
            (e) => {
                this.isAlertVisible = true;
                this.spinner.hide();
                this.errorMessage = 'Некорректные авторизационные данные';
                this.isLoginFailed = true;
            },
        );
    }

    private loginDetailsSetup(res: LoginResponse) {
        const { accessToken } = res;

        const { userId, clientId, products, permissions, roles, firstname, lastname, company } = jwtDecode(accessToken) as TokenPayload;

        if (!userId && !products && products.length === 0 && !permissions && !roles && !clientId) {
            this.errorMessage = 'Что-то пошло не так, просьба обратиться в техническую поддержку';
            return;
        }

        this.setMenuByProducts(this.getUserMenuByProducts(products));

        const isSetUserData = this.setUserData({
            accessToken,
            clientId,
            userId,
            products,
            permissions,
            roles,
            firstname,
            lastname,
            company,
        });

        if (isSetUserData) {
            this.spinner.hide();

            this.router.navigate(['sm/analytics/calls']);
        } else {
            this.spinner.hide();
            this.errorMessage = 'Что-то пошло не так, попробуйте позже';
        }
    }

    public getUserMenuByProducts(products: Products[]): Menu[] {
        const menu: Menu[] = [...BASE_ROLE_MENU];

        for (const prod of products) {
            menu.push(...MENU_BY_PRODUCT_TYPE[prod.productType]);
        }

        return menu.sort((a, b) => a.code - b.code);
    }

    private setMenuByProducts(menuData: Menu[]): void {
        const setMenu = [];
        menuData?.forEach((menu) => {
            const route: RouteInfo = {
                path: menu.path,
                title: menu.name,
                icon: menu.icon,
                class: menu?.group?.lines?.length > 0 ? 'has-sub' : '',
                badge: menu.badge,
                badgeClass: menu.badgeClass,
                isExternalLink: menu.externalLink,
                submenu: menu?.group?.lines?.length > 0 ? this.changeMenu(menu?.group?.lines) : [],
            };
            setMenu.push(route);
        });

        this.authService.setMenu(setMenu);
    }

    private changeMenu(menuData: Menu[]): RouteInfo[] {
        if (menuData?.length > 0) {
            return menuData.map((menu) => {
                const route: RouteInfo = {
                    path: menu.path,
                    title: menu.name,
                    icon: menu.icon,
                    class: menu?.group?.lines?.length > 0 ? 'has-sub' : '',
                    badge: menu.badge,
                    badgeClass: menu.badgeClass,
                    isExternalLink: menu.externalLink,
                    submenu: menu?.group?.lines?.length > 0 ? this.changeMenu(menu?.group?.lines) : [],
                };
                return route;
            });
        }
    }

    private setUserData(data: SetsCookiesData): boolean {
        return this.authService.setCookies(data);
    }
}
