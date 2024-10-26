import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { SendSmsComponent } from './send/send-sms.component';
import { SmsStatisticComponent } from './statistic/sms-statistic.component';
import { SmsSettingsComponent } from './settings/sms-settings.component';
import { SmsAddSettingsComponent } from './settings/add-settings/sms-add-settings.component';

const routes: Routes = [
    {
        path: 'statistic',
        component: SmsStatisticComponent,
        data: {
            title: 'Sms статистика',
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'send',
        component: SendSmsComponent,
        data: {
            title: 'Отпарвка смс',
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'settings',
        component: SmsSettingsComponent,
        data: {
            title: 'Sms сервиса',
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'settings/add',
        component: SmsAddSettingsComponent,
        data: {
            title: 'Sms сервиса',
        },
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SmsRoutingModule {}
