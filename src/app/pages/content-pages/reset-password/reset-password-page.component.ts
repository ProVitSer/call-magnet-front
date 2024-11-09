import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserProfileService } from 'app/pages/full-pages/users-profile/services/user-profile.service';
import { MustMatch } from 'app/shared/directives/must-match.validator';
import { BaseAuthResponse } from 'app/shared/models/auth';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { UtilService } from 'app/shared/services/util.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-reset-password-page',
    templateUrl: './reset-password-page.component.html',
    styleUrls: ['./reset-password-page.component.scss'],
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
        private userProfileService: UserProfileService,
        private spinner: NgxSpinnerService,
        private route: ActivatedRoute,
    ) {
        this.resetPasswordForm = this.fb.group(
            {
                password: ['', [Validators.required, Validators.minLength(8)]],
                confirmPassword: ['', Validators.required],
            },
            {
                validator: MustMatch('password', 'confirmPassword'),
            },
        );
    }

    get rf() {
        return this.resetPasswordForm.controls;
    }

    async ngOnInit(): Promise<void> {
        this.route.params.subscribe((params) => {
            this.verificationCode = params['id'];

            if (!UtilService.isUUIDv4(this.verificationCode)) {
                SweetalertService.errorAlert('', 'Некорректная ссылка');

                return setTimeout(() => {
                    this.router.navigate(['/error']);
                }, this.redirectTimeout);
            }

            this.spinner.show(undefined, {
                type: 'ball-triangle-path',
                size: 'medium',
                bdColor: 'rgba(0, 0, 0, 0.8)',
                color: '#fff',
                fullScreen: true,
            });

            this.checkVerificationCode(this.verificationCode);
        });
    }

    resetPassword() {
        this.resetPasswordSubmitted = true;

        if (this.resetPasswordForm.invalid) {
            return;
        }

        this.userProfileService
            .resetPassword({ verificationCode: this.verificationCode, password: this.resetPasswordForm.value.password })
            .subscribe(
                (res: BaseAuthResponse) => {
                    if (res) {
                        SweetalertService.autoCloseSuccessAlert(
                            '',
                            'Сейчас вы будите перенаправлены на страницу автовризации',
                            this.redirectTimeout,
                        );

                        setTimeout(() => {
                            this.router.navigate(['/login']);
                        }, this.redirectTimeout);
                    } else {
                        SweetalertService.errorAlert('', 'Что-то пошло не так, просьба обратиться в техническую поддержку');
                    }
                },
                (e) => {
                    SweetalertService.errorAlert('Ошибка верификации', e);
                    setTimeout(() => {
                        this.router.navigate(['/error']);
                    }, this.redirectTimeout);
                },
            );
    }

    private async checkVerificationCode(verificationCode: string): Promise<void> {
        try {
            const result = await this.userProfileService.checkVerificationCode(verificationCode).toPromise();

            if (result.isValid) {
                this.spinner.hide();
                this.isButtonResetDisabled = false;
            } else {
                SweetalertService.errorAlert('', 'Ссылка на востановление пароля не корректна или истек ее срок');

                setTimeout(() => {
                    this.router.navigate(['/error']);
                }, this.redirectTimeout);

                return;
            }
        } catch (e) {
            this.spinner.hide();
            SweetalertService.errorAlert('', 'Что-то пошло не так, просьба обратиться в техническую поддержку');
        }
    }
}
