import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { RoleGuard } from 'app/shared/auth/role-guard.service';
import { KpiSettingsComponent } from './components/settings/kpi-settings.component';
import { KpiStatisticComponent } from './components/statistic/kpi-statistic.component';
import { Roles } from 'app/shared/models/user';


const routes: Routes = [
  {
    path: 'statistic',
    component: KpiStatisticComponent,
    data: {
      title: 'Статистика',
      expectedRole: [Roles.kpi]
    },
    canActivate: [AuthGuard, RoleGuard],
  },

  {
    path: 'settings',
    component: KpiSettingsComponent,
    data: {
      title: 'Настройки',
      expectedRole: [Roles.kpi]
    },
    canActivate: [AuthGuard, RoleGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KpiRoutingModule { }
