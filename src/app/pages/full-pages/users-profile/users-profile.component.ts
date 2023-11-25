import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { UserProfileService } from './services/user-profile.service';
import { MustMatch } from 'app/shared/directives/must-match.validator';
import { ClientInfoResponse, UpdateClientInfoResponse } from './models/client-info';
import { HttpResponse } from 'app/shared/models/response';
import { SweetalertService } from 'app/shared/services/sweetalert.service';

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

  // { label: '3cx', class: 'btn btn-success mr-1 mb-1'},
  // { label: 'API', class: 'btn btn-outline-custom-light mr-1 mb-1'},


  constructor(private fb: UntypedFormBuilder, private cdr: ChangeDetectorRef,private readonly userProfileService: UserProfileService) { }


  ngOnInit(): void {
    this.initGeneralForm();
    this.getClientInfo();
  }

  get gf() {
    return this.generalForm.controls;
  }

  get cpf() {
    return this.changePasswordForm.controls;
  }



  private initGeneralForm(){
    this.generalForm = new UntypedFormGroup({
      firstname: new UntypedFormControl('', [Validators.required]),
      lastname: new UntypedFormControl('', [Validators.required]),
      phoneNumber: new UntypedFormControl('', [Validators.pattern(/^((\+7|7|8)+([0-9]){10})$/)]),
      company: new UntypedFormControl('', [Validators.required])
    });
  }

  // private initChangePassFrom(){
  //   this.changePasswordForm = this.fb.group({
  //     oldPassword: new UntypedFormControl('', [Validators.required]),
  //     newPassword: new UntypedFormControl('', [Validators.required]),
  //     retypeNewPassword: new UntypedFormControl('', [Validators.required])
  //   }, {
  //     validator: MustMatch('password', 'confirmPassword')
  //   });
  // }

  private getClientInfo(){
    this.userProfileService.getClientInfo().subscribe(
      (res: HttpResponse<ClientInfoResponse>) => {
        const result = res;
        if (result.result && res.hasOwnProperty('data')) {
          this.setClientInfoToFrom(result.data);
        }
      },
      (e) => {
        SweetalertService.errorAlert('Ошибка получение данных по аккаунту', e)
    })
  }

  private setClientInfoToFrom(data: ClientInfoResponse){
    this.email = data.email;
    this.generalForm.patchValue({
      firstname: data.firstname,
      lastname: data.lastname,
      phoneNumber: data.phoneNumber,
      company: data.company,
    });

    data.roles.map((r: string) => {
      this.buttons.push({label: r, class: 'btn btn-success mr-1 mb-1'});
    })
   
    this.cdr.markForCheck();
  }

  setActiveTab(tab) {
    this.activeTab = tab;
  }


  onGeneralFormSubmit() {
    this.generalFormSubmitted = true;
    if (this.generalForm.invalid) {
      return;
    }

    const dataToSend = {
      firstname: this.generalForm.value.name,
      lastname: this.generalForm.value.lastname,
      phoneNumber: this.generalForm.value.phone,
      company: this.generalForm.value.companyName,

    };

    this.userProfileService.updateClientInfo(dataToSend).subscribe(
      (res: HttpResponse<UpdateClientInfoResponse>) => {
        const result = res;
        if (result.result && res.hasOwnProperty('data')) {
          SweetalertService.successAlertWithFunc('', 'Данные обновлены успешно', this.reloadPage);
          ;
        }
      },
      (e) => {
        SweetalertService.errorAlert('Ошибка обновление данных', e)
    })

  }

  reloadPage() {
    location.reload();
  }

  onChangePasswordFormSubmit() {
    this.changePasswordFormSubmitted = true;
    if (this.changePasswordForm.invalid) {
      return;
    }
  }
}
