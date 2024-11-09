import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { PbxApiAddSettingsComponent } from './components/settings/add-settings/pbx-api-add-settings.component';
import { PbxApiTokenComponent } from './components/token/pbx-api-token.component';
import { ApiComponent } from './components/api/api.component';
import { PbxApiSettingsComponent } from './components/settings/settings/pbx-api-settings.component';

const routes: Routes = [
    {
        path: 'token',
        component: PbxApiTokenComponent,
        data: {
            title: '3CX API Настройки',
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'settings',
        component: PbxApiSettingsComponent,
        data: {
            title: '3CX API Настройки',
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'settings/add',
        component: PbxApiAddSettingsComponent,
        data: {
            title: '3CX API Настройки',
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'api',
        component: ApiComponent,
        data: {
            title: '3CX API',
        },
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PbxApiRoutingModule {}
