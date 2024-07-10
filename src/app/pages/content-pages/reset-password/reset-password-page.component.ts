import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthRequestService } from 'app/shared/auth/auth-request.service';
import { AuthService } from 'app/shared/auth/auth.service';
import { MustMatch } from 'app/shared/directives/must-match.validator';
import { BaseAuthResponse } from 'app/shared/models/auth';
import { HttpResponse } from 'app/shared/models/response';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { UtilService } from 'app/shared/services/util.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss']
})

export class ResetPasswordPageComponent implements OnInit {
  private verificationCode: string;
  resetPasswordForm: UntypedFormGroup;
  resetPasswordSubmitted = false;
  isButtonResetDisabled = true;
  private redirectTimeout = 2000;


  constructor(
    private fb: UntypedFormBuilder,
    private router: Router, 
    private authRequestService: AuthRequestService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    ) {
      this.resetPasswordForm = this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      }, {
        validator: MustMatch('password', 'confirmPassword')
      });
  }

  get rf() {
    return this.resetPasswordForm.controls;
  }

  async ngOnInit(): Promise<void> {

    this.route.params.subscribe(params => {
      this.verificationCode = params['id'];
      if(!UtilService.isUUIDv4(this.verificationCode)) {
        SweetalertService.errorAlert('','Некорректная ссылка');
        return setTimeout(() => {
          this.router.navigate(['/error']);
        }, this.redirectTimeout);
        
      }
      
      this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });   

      this.checkVerificationCode(this.verificationCode);
    });


  }

  resetPassword(){
    this.resetPasswordSubmitted = true;

    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.authRequestService.resetPassword({ verificationCode: this.verificationCode, password: this.resetPasswordForm.value.password}).subscribe(
      (res: HttpResponse<BaseAuthResponse>) => {
        const result = res;
        if (result.result && res.hasOwnProperty('data')) {
          SweetalertService.autoCloseSuccessAlert('', 'Сейчас вы будите перенаправлены на страницу автовризации', this.redirectTimeout);
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, this.redirectTimeout);
        } else {
          SweetalertService.errorAlert('', 'Что-то пошло не так, просьба обратиться в техническую поддержку')
        }
      },
      (e) => {
        SweetalertService.errorAlert('Ошибка верификации', e);
        setTimeout(() => {
          this.router.navigate(['/error']);
        }, this.redirectTimeout);
      })
  }


  private async checkVerificationCode(id: string): Promise<void> {
    try {
      const result = await this.authRequestService.checkVerificationCode(id).toPromise();
      if (result.result && result.hasOwnProperty('data')) {
        this.spinner.hide();
        if(!result.data.isValid){
          SweetalertService.errorAlert('', 'Ссылка на востановление пароля не корректна или истек ее срок');
          setTimeout(() => {
            this.router.navigate(['/error']);
          }, this.redirectTimeout);
          return;
        };

        this.isButtonResetDisabled = !result.data.isValid;
        return;
      }
      this.spinner.hide();
      SweetalertService.errorAlert('', 'Что-то пошло не так, просьба обратиться в техническую поддержку')
    } catch(e){
      this.spinner.hide();
      SweetalertService.errorAlert('', e);
    }
  }

}
