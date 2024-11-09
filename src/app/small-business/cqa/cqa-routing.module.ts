import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { CqaStatisticComponent } from './statistic/cqa-statistic.component';
import { CqaSettingsComponent } from './settings/cqa-settings.component';

const routes: Routes = [
    {
        path: 'statistic',
        component: CqaStatisticComponent,
        data: {
            title: 'Статистика',
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'settings',
        component: CqaSettingsComponent,
        data: {
            title: 'Настройка',
        },
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CqaRoutingModule {}
