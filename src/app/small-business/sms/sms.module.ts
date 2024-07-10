import { NgModule } from '@angular/core';
import { SmsSettingsComponent } from './components/settings/sms-settings.component';
import { SmsRoutingModule } from './sms-routing.module';
import { SmsSendComponent } from './components/send/sms-send.component';
import { SmsStatisticComponent } from './components/statistic/sms-statistic.component';
import { SmsMassSendingComponent } from './components/mass-sending/sms-mass-sending.component';
import { SmsNoAnswerCallSendingComponent } from './components/no-answer-call-sending/sms-no-answer-call-sending.component';


@NgModule({
  declarations: [SmsSettingsComponent, SmsSendComponent, SmsStatisticComponent, SmsMassSendingComponent, SmsNoAnswerCallSendingComponent],
  imports: [SmsRoutingModule],
  exports:[]
})
export class SmsModule { }
