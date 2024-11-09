import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseUsersResponse } from 'app/pages/full-pages/users-profile/models/users-profile.model';
import { UserProfileService } from 'app/pages/full-pages/users-profile/services/user-profile.service';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-forgot-password-page',
    templateUrl: './forgot-password-page.component.html',
    styleUrls: ['./forgot-password-page.component.scss'],
})
export class ForgotPasswordPageComponent implements OnInit {
    forogtPasswordForm: FormGroup;
    forogtPasswordSubmitted = false;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private fb: UntypedFormBuilder,
        private spinner: NgxSpinnerService,
        private userProfileService: UserProfileService,
    ) {}

    ngOnInit(): void {
        this.forogtPasswordForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
        });
    }

    get rf() {
        return this.forogtPasswordForm.controls;
    }

    onSubmit() {
        this.forogtPasswordSubmitted = true;

        if (this.forogtPasswordForm.invalid) {
            return;
        }

        this.spinner.show(undefined, {
            type: 'ball-triangle-path',
            size: 'medium',
            bdColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            fullScreen: true,
        });

        this.forogtPassword(this.forogtPasswordForm.value.email);
    }

    private forogtPassword(email: string) {
        this.userProfileService.forogtPassword({ email }).subscribe(
            (res: BaseUsersResponse) => {
                const result = res;
                if (result) {
                    this.spinner.hide();
                    return SweetalertService.successAlert('', 'Вам на почту будет отправлено письмо со ссылкой на восстановление пароля');
                }
                this.spinner.hide();
                SweetalertService.errorAlert(
                    'Ошибка восстановление пароля',
                    'Что-то пошло не так, просьба обратиться в техническую поддержку',
                );
            },
            (e) => {
                this.spinner.hide();
                SweetalertService.errorAlert('Ошибка восстановление пароля', e);
                this.forogtPasswordForm.reset();
            },
        );
    }

    onLogin() {
        this.router.navigate(['login'], { relativeTo: this.route.parent });
    }
}
