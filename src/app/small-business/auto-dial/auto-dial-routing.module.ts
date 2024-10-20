import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutoDialSettingsComponent } from './components/settings/settings.component';
import { AutoDialReportsComponent } from './components/reports/reports.component';
import { AutoDialTasksComponent } from './components/tasks/tasks.component';
import { AutoDialCreateComponent } from './components/create/create.component';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { RoleGuard } from 'app/shared/auth/role-guard.service';
import { Roles } from 'app/shared/models/user';


const routes: Routes = [
  {
    path: 'create',
    component: AutoDialCreateComponent,
    data: {
      title: 'Создать',
      expectedRole: [Roles.autoDial]
    },
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'settings',
    component: AutoDialSettingsComponent,
    data: {
      title: 'Настройки',
      expectedRole: [Roles.autoDial]
    },
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'reports',
    component: AutoDialReportsComponent,
    data: {
      title: 'Статистика',
      expectedRole: [Roles.autoDial]
    },
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'tasks',
    component: AutoDialTasksComponent,
    data: {
      title: 'Задания на обзвон',
      expectedRole: [Roles.autoDial]
    },
    canActivate: [AuthGuard, RoleGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutoDialRoutingModule { }
