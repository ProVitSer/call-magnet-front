import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { AddMissedCallSettingsComponent } from './components/settings/add-missed-call/add-missed-call-settings.component';
import { MissedCallSettingsComponent } from './components/settings/missed-call-settings.component';

const routes: Routes = [
    {
        path: '',
        component: MissedCallSettingsComponent,
        data: {
            title: 'Настройки пропущенных вызовов',
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'add',
        component: AddMissedCallSettingsComponent,
        data: {
            title: 'Настройки пропущенных вызовов',
        },
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MissedCallRoutingModule {}
