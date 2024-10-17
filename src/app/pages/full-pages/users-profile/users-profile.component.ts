import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { UserProfileService } from './services/user-profile.service';
import { MustMatch } from '../../../shared/directives/must-match.validator';
import { ChangePasswordData, UpdateClientInfoResponse } from './models/client-info';
import { HttpResponse } from 'app/shared/models/response';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { AuthService } from 'app/shared/auth/auth.service';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.scss', '../../../../assets/sass/libs/select.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersProfileComponent implements OnInit {
  activeTab = "general";
  generalFormSubmitted = false;
  changePasswordFormSubmitted = false;
  alertVisible = true;
  generalForm: UntypedFormGroup;
  changePasswordForm: UntypedFormGroup;
  email = ''
  buttons = [];

  constructor(private fb: UntypedFormBuilder, private cdr: ChangeDetectorRef,private readonly userProfileService: UserProfileService, private authService: AuthService) { }


  ngOnInit(): void {
    this.initGeneralForm();
    // this.getClientInfo();
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

  private initGeneralForm(){
    this.generalForm = new UntypedFormGroup({
      firstname: new UntypedFormControl('', [Validators.required]),
      lastname: new UntypedFormControl('', [Validators.required]),
      phoneNumber: new UntypedFormControl('', [Validators.pattern(/^((\+7|7|8)+([0-9]){10})$/)]),
      company: new UntypedFormControl('', [Validators.required])
    });
  }

  private initChangePassFrom(){
    this.changePasswordForm = this.fb.group({
      oldPassword: new UntypedFormControl('', [Validators.required]),
      newPassword: new UntypedFormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
      retypeNewPassword: new UntypedFormControl('', [Validators.required])
    }, {
      validator: MustMatch('newPassword', 'retypeNewPassword')
    });
  }

//   private getClientInfo(){
//     this.userProfileService.getClientInfo().subscribe(
//       (res: HttpResponse<ClientInfoResponse>) => {
//         const result = res;
//         if (result.result && res.hasOwnProperty('data')) {
//           this.setClientInfoToFrom(result.data);
//         }
//       },
//       (e) => {
//         SweetalertService.errorAlert('Ошибка получение данных по аккаунту', e)
//     })
//   }

//   private setClientInfoToFrom(data: ClientInfoResponse){
//     this.email = data.email;
//     this.generalForm.patchValue({
//       firstname: data.firstname,
//       lastname: data.lastname,
//       phoneNumber: data.phoneNumber,
//       company: data.company,
//     });

//     this.setAvailableFunctionality(data);


//     this.cdr.markForCheck();
//   }

//   private setAvailableFunctionality(data: ClientInfoResponse){
//     const avaliableFunc = [];
//     const unavaliableFunc = [];
//     AVALIABLE_ROLES.map((r: Roles) => {
//         if(data.roles.includes(r)){
//           avaliableFunc.push({ label: USER_ROLES_DESCRIPTION[r], class: 'btn btn-success mr-1 mb-1' })
//         } else {
//           unavaliableFunc.push({ label: USER_ROLES_DESCRIPTION[r], class: 'btn btn-outline-custom-light mr-1 mb-1'})

//         }
//     });

//     this.buttons.push(...avaliableFunc, ...unavaliableFunc)

//   }


  onGeneralFormSubmit() {
    this.generalFormSubmitted = true;
    if (this.generalForm.invalid) {
      return;
    }

    const dataToSend = {
      firstname: this.generalForm.value.firstname,
      lastname: this.generalForm.value.lastname,
      phoneNumber: this.generalForm.value.phoneNumber,
      company: this.generalForm.value.company,

    };

    // return this.updateClientInfo(dataToSend);
  }



  onChangePasswordFormSubmit() {
    this.changePasswordFormSubmitted = true;
    if (this.changePasswordForm.invalid) {
      return;
    }

    if(this.changePasswordForm.value.oldPassword === this.changePasswordForm.value.newPassword){
      return SweetalertService.errorAlert('Ошибка обновление пароля', 'Действующий и новый пароль должны отличаться!')
    }

    return this.changePassword({ oldPassword: this.changePasswordForm.value.oldPassword, newPassword: this.changePasswordForm.value.newPassword });
  }

//   private updateClientInfo(data: UpdateClientInfoData){
//     this.userProfileService.updateClientInfo(data).subscribe(
//       (res: HttpResponse<UpdateClientInfoResponse>) => {
//         const result = res;
//         if (result.result && res.hasOwnProperty('data')) {
          
//           this.authService.updateUserData(data);

//           SweetalertService.successAlertWithFunc('', 'Данные обновлены успешно', this.reloadPage);
//           ;
//         }
//       },
//       (e) => {
//         SweetalertService.errorAlert('Ошибка обновление данных', e)
//     })
//   }

  private changePassword(data: ChangePasswordData){
    this.userProfileService.changePassword(data).subscribe(
      (res: HttpResponse<UpdateClientInfoResponse>) => {
        const result = res;
        if (result.result && res.hasOwnProperty('data')) {
          SweetalertService.successAlertWithFunc('', 'Данные обновлены успешно', this.reloadPage);
          ;
        }
      },
      (e) => {
        SweetalertService.errorAlert('Ошибка обновление пароля', e)
    })
  }
}
