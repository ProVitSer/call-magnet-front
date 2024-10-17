import { NgModule } from '@angular/core';
import { SmsSettingsComponent } from './components/settings/sms-settings.component';
import { SmsRoutingModule } from './sms-routing.module';
import { SmsSendComponent } from './components/send/sms-send.component';
import { SmsStatisticComponent } from './components/statistic/sms-statistic.component';


@NgModule({
  declarations: [SmsSettingsComponent, SmsSendComponent, SmsStatisticComponent],
  imports: [SmsRoutingModule],
  exports:[]
})
export class SmsModule { }
