import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmsSettingsComponent } from './components/settings/sms-settings.component';
import { SmsSendComponent } from './components/send/sms-send.component';
import { SmsStatisticComponent } from './components/statistic/sms-statistic.component';
import { SmsMassSendingComponent } from './components/mass-sending/sms-mass-sending.component';
import { SmsNoAnswerCallSendingComponent } from './components/no-answer-call-sending/sms-no-answer-call-sending.component';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { RoleGuard } from 'app/shared/auth/role-guard.service';


const routes: Routes = [
  {
    path: 'send',
    component: SmsSendComponent,
    data: {
      title: 'Отправка',
      expectedRole: ['SmallBusiness']

    },
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'statistic',
    component: SmsStatisticComponent,
    data: {
      title: 'Статистика',
      expectedRole: ['SmallBusiness']
    },
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'mass-sending',
    component: SmsMassSendingComponent,
    data: {
      title: 'Массовая рассылка',
      expectedRole: ['SmallBusiness']
    },
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'no-answer-call-sending',
    component: SmsNoAnswerCallSendingComponent,
    data: {
      title: 'Неотвеченные вызовы',
      expectedRole: ['SmallBusiness']
    },
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'settings',
    component: SmsSettingsComponent,
    data: {
      title: 'Настройки',
      expectedRole: ['SmallBusiness']
    },
    canActivate: [AuthGuard, RoleGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmsRoutingModule { }
