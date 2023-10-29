import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


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



  constructor(private router: Router, private authService: AuthService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.initializeLoginForm();
    this.getQueryParams();
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next(true);
    this.ngDestroy$.complete();
  }

  get lf() {
    return this.loginForm.controls;
  }


  initializeLoginForm() {
    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', [Validators.required]),
    });
  }

  getQueryParams() {
    this.route.queryParams.pipe(takeUntil(this.ngDestroy$)).subscribe((param) => {
      console.log(param)
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
      (res: any) => {
        const result: any = res;
        console.log(result)
      })
  }

  onForgotPassword() {
        this.router.navigate(['/forgotpassword']);
  }

  onRegister() {
        this.router.navigate(['/register']);
  }

}
