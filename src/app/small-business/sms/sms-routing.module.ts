import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmsSettingsComponent } from './components/settings/sms-settings.component';
import { SmsSendComponent } from './components/send/sms-send.component';
import { SmsStatisticComponent } from './components/statistic/sms-statistic.component';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';


const routes: Routes = [
  {
    path: 'send',
    component: SmsSendComponent,
    data: {
      title: 'Отправка',

    },
    canActivate: [AuthGuard],
  },
  {
    path: 'statistic',
    component: SmsStatisticComponent,
    data: {
      title: 'Статистика',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    component: SmsSettingsComponent,
    data: {
      title: 'Настройки',
    },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmsRoutingModule { }
