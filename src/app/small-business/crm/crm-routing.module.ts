import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrmSettingsComponent } from './components/settings/crm-settings.component';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { RoleGuard } from 'app/shared/auth/role-guard.service';
import { Roles } from 'app/shared/models/user';


const routes: Routes = [
  {
    path: 'settings',
    component: CrmSettingsComponent,
    data: {
      title: 'Настройки',
      expectedRole: [Roles.crm]
    },
    canActivate: [AuthGuard, RoleGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmRoutingModule { }
