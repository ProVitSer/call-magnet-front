import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { UserProfileService } from './services/user-profile.service';
import { MustMatch } from '../../../shared/directives/must-match.validator';
import { UserInfoResponse } from './models/users-profile.model';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { AuthService } from 'app/shared/auth/auth.service';
import { AVALIABLE_PRODUCT, LICENSE_PRODUCT_DESCRIPTION, ProductType } from 'app/shared/models/license';
import { USER_INFO } from './models/test-data';

@Component({
    selector: 'app-users-profile',
    templateUrl: './users-profile.component.html',
    styleUrls: ['./users-profile.component.scss', '../../../../assets/sass/libs/select.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class UsersProfileComponent implements OnInit {
    activeTab = 'general';
    generalFormSubmitted = false;
    changePasswordFormSubmitted = false;
    alertVisible = true;
    generalForm: UntypedFormGroup;
    changePasswordForm: UntypedFormGroup;
    email = '';
    buttons = [];
    company = '';

    constructor(
        private fb: UntypedFormBuilder,
        private cdr: ChangeDetectorRef,
        private readonly userProfileService: UserProfileService,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.initGeneralForm();
        this.getUserInfo();
        this.initChangePassFrom();
    }

    get gf() {
        return this.generalForm.controls;
    }

    get cpf() {
        return this.changePasswordForm.controls;
    }

    reloadPage() {
        location.reload();
    }

    setActiveTab(tab) {
        this.activeTab = tab;
    }

    private initGeneralForm() {
        this.generalForm = new UntypedFormGroup({
            firstname: new UntypedFormControl('', [Validators.required]),
            lastname: new UntypedFormControl('', [Validators.required]),
            phoneNumber: new UntypedFormControl('', [Validators.pattern(/^((\+7|7|8)+([0-9]){10})$/)]),
        });
    }

    private initChangePassFrom() {
        this.changePasswordForm = this.fb.group(
            {
                oldPassword: new UntypedFormControl('', [Validators.required]),
                newPassword: new UntypedFormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
                retypeNewPassword: new UntypedFormControl('', [Validators.required]),
            },
            {
                validator: MustMatch('newPassword', 'retypeNewPassword'),
            },
        );
    }

    private getUserInfo() {
        this.setUserInfoToFrom(USER_INFO as UserInfoResponse);
    }

    private setUserInfoToFrom(data: UserInfoResponse) {
        this.email = data.email;
        (this.company = data.company),
            this.generalForm.patchValue({
                firstname: data.firstname,
                lastname: data.lastname,
                phoneNumber: data.phoneNumber,
            });

        this.setAvailableFunctionality(data);

        this.cdr.markForCheck();
    }

    private setAvailableFunctionality(data: UserInfoResponse) {
        const avaliableFunc = [];

        const unavaliableFunc = [];

        AVALIABLE_PRODUCT.map((r: ProductType) => {
            if (data.products.includes(r)) {
                avaliableFunc.push({ label: LICENSE_PRODUCT_DESCRIPTION[r], class: 'btn btn-success mr-1 mb-1' });
            } else {
                unavaliableFunc.push({ label: LICENSE_PRODUCT_DESCRIPTION[r], class: 'btn btn-outline-custom-light mr-1 mb-1' });
            }
        });

        this.buttons.push(...avaliableFunc, ...unavaliableFunc);
    }

    onGeneralFormSubmit() {
        this.generalFormSubmitted = true;

        if (this.generalForm.invalid) {
            return;
        }

        SweetalertService.successAlertWithFunc('', 'Данные обновлены успешно', this.reloadPage);
    }

    onChangePasswordFormSubmit() {
        this.changePasswordFormSubmitted = true;

        if (this.changePasswordForm.invalid) {
            return;
        }

        if (this.changePasswordForm.value.oldPassword === this.changePasswordForm.value.newPassword) {
            return SweetalertService.errorAlert('Ошибка обновление пароля', 'Действующий и новый пароль должны отличаться!');
        }

        SweetalertService.successAlertWithFunc('', 'Данные обновлены успешно', this.reloadPage);
    }
}
