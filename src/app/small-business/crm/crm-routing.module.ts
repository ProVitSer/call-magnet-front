import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { CrmSettingsComponent } from './settings/crm-settings.component';
import { CrmAddSettingsComponent } from './settings/add-settings/crm-add-settings.component';

const routes: Routes = [
    {
        path: 'settings',
        component: CrmSettingsComponent,
        data: {
            title: 'Sms сервиса',
        },
    },
    {
        path: 'settings/add',
        component: CrmAddSettingsComponent,
        data: {
            title: 'Sms сервиса',
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CrmRoutingModule {}
