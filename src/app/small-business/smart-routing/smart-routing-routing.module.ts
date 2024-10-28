import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { SmartRoutingSettingsComponent } from './components/settings/smart-routing-settings.component';
import { AddSmartRoutingSettingsComponent } from './components/settings/add-smart-routing/add-smart-routing-settings.component';

const routes: Routes = [
    {
        path: '',
        component: SmartRoutingSettingsComponent,
        data: {
            title: 'Настройки Умной маршрутизации',
        },
        canActivate: [AuthGuard],
    },

    {
        path: 'add',
        component: AddSmartRoutingSettingsComponent,
        data: {
            title: 'Настройки Умной маршрутизации',
        },
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SmartRoutingRoutingModule {}
