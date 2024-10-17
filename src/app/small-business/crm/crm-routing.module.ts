import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrmSettingsComponent } from './components/settings/crm-settings.component';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';


const routes: Routes = [
  {
    path: 'settings',
    component: CrmSettingsComponent,
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
export class CrmRoutingModule { }
