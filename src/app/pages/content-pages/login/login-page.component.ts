import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { LoginResponse } from 'app/shared/models/login';
import { HttpResponse } from 'app/shared/models/response';
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { SetLocalStorageData, TokenPayload } from 'app/shared/models/auth';
import { ROUTE_BY_ROLE } from 'app/shared/constant-url/route-by-role';

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
  errorMessage: string;
  public showPassword: boolean = false;

  constructor(private router: Router, private authService: AuthService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
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

    this.authService.signIn(dataToSend).subscribe(
      (res: HttpResponse<LoginResponse>) => {
        const result = res;
        if (result.result && res.hasOwnProperty('data')) {

          localStorage.clear();
          this.isLoginFailed = false;

          const { accessToken, refreshToken, accessTokenExpires } = result.data;

          const { sub, role } = jwtDecode(accessToken) as TokenPayload;
          console.log(sub, role)
          const isSetUserData = this.setUserData({ accessToken, refreshToken, accessTokenExpires, clientId: sub, role});

          if (isSetUserData) {
            this.spinner.hide();
            console.log(ROUTE_BY_ROLE[role])
            this.router.navigate([ROUTE_BY_ROLE[role]]);
          } else {
            this.spinner.hide();
            this.errorMessage = 'Что-то пошло не так,попробуйте позже';
          }

        } else {

          this.spinner.hide();
          this.errorMessage = 'Что-то пошло не так, просьба обратиться в техническую поддержку';
          this.cdr.markForCheck();

        }
      },
      (e) => {
        this.spinner.hide();
        this.isLoginFailed = true;
        this.errorMessage = e;
        this.cdr.markForCheck();
      })
  }

  private setUserData(data: SetLocalStorageData): boolean {
    return this.authService.setLocalStorage(data)
  }

  onForgotPassword() {
        this.router.navigate(['/forgotpassword']);
  }

  onRegister() {
        this.router.navigate(['/register']);
  }

}
