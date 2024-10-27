import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { SmartRoutingSettingsComponent } from './components/settings/smart-routing-settings.component';

const routes: Routes = [
    {
        path: 'settings',
        component: SmartRoutingSettingsComponent,
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
