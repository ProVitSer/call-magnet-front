import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { KpiSettingsComponent } from './components/settings/kpi-settings.component';
import { KpiStatisticComponent } from './components/statistic/kpi-statistic.component';


const routes: Routes = [
  {
    path: 'statistic',
    component: KpiStatisticComponent,
    data: {
      title: 'Статистика',
    },
    canActivate: [AuthGuard],
  },

  {
    path: 'settings',
    component: KpiSettingsComponent,
    data: {
      title: 'Настройки',
    },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KpiRoutingModule { }
