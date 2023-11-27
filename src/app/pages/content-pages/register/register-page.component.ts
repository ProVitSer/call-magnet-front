import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, Validators, UntypedFormBuilder } from '@angular/forms';
import { MustMatch } from '../../../shared/directives/must-match.validator';
import { Router } from '@angular/router';
import { RegisterUserResponse } from 'app/shared/models/auth';
import { HttpResponse } from 'app/shared/models/response';
import { NgxSpinnerService } from 'ngx-spinner';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { AuthRequestService } from 'app/shared/auth/auth-request.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent implements OnInit {
  registerFormSubmitted = false;
  registerForm: UntypedFormGroup;
  constructor(private fb: UntypedFormBuilder, private router: Router, private authRequestService: AuthRequestService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^((\+7|7|8)+([0-9]){10})$/)]],
      companyName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      // acceptTerms: [false, Validators.requiredTrue] // пока убираем, добавим когда будет политика
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get rf() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.registerFormSubmitted = true;

    if (this.registerForm.invalid) {
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
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      firstname: this.registerForm.value.name,
      lastname: this.registerForm.value.lastname,
      phoneNumber: this.registerForm.value.phone,
      company: this.registerForm.value.companyName,

    };

    this.authRequestService.register(dataToSend).subscribe(
      (res: HttpResponse<RegisterUserResponse>) => {
        const result = res;
        if (result.result && res.hasOwnProperty('data')) {
          this.spinner.hide();
          return SweetalertService.successAlertWithFunc('Регистрация прошла успешно', 'Вам на почту будет отправлено пиьсмо с подтверждением', this.toLoginPage.bind(this));
        }
        this.spinner.hide();
        SweetalertService.errorAlert('Ошибка регистрации', 'Что-то пошло не так, просьба обратиться в техническую поддержку')
      },
      (e) => {
        this.spinner.hide();
        SweetalertService.errorAlert('Ошибка регистрации', e)
      })
  }

  private toLoginPage(){
    this.router.navigate(['/login']);
  }
}
