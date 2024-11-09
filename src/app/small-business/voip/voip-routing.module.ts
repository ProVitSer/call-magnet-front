import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { VoipAddSettingsComponent } from './components/settings/add-settings/voip-add-settings.component';
import { VoipSettingsComponent } from './components/settings/voip-settings.component';

const routes: Routes = [
    {
        path: 'settings',
        component: VoipSettingsComponent,
        data: {
            title: 'Настройки VoIP',
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'settings/add',
        component: VoipAddSettingsComponent,
        data: {
            title: 'Настройки VoIP',
        },
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VoipRoutingModule {}
