import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmsSettingsComponent } from './components/settings/sms-settings.component';
import { SmsSendComponent } from './components/send/sms-send.component';
import { SmsStatisticComponent } from './components/statistic/sms-statistic.component';
import { SmsMassSendingComponent } from './components/mass-sending/sms-mass-sending.component';
import { SmsNoAnswerCallSendingComponent } from './components/no-answer-call-sending/sms-no-answer-call-sending.component';


const routes: Routes = [
  {
    path: 'send',
    component: SmsSendComponent,
    data: {
      title: 'Отправка'
    },
  },
  {
    path: 'statistic',
    component: SmsStatisticComponent,
    data: {
      title: 'Статистика'
    },
  },
  {
    path: 'mass-sending',
    component: SmsMassSendingComponent,
    data: {
      title: 'Массовая рассылка'
    },
  },
  {
    path: 'no-answer-call-sending',
    component: SmsNoAnswerCallSendingComponent,
    data: {
      title: 'Неотвеченные вызовы'
    },
  },
  {
    path: 'settings',
    component: SmsSettingsComponent,
    data: {
      title: 'Настройки'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmsRoutingModule { }
