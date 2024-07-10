import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnaliticComponent } from './components/analitic.component';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { RoleGuard } from 'app/shared/auth/role-guard.service';
import { Roles } from 'app/shared/models/user';


const routes: Routes = [
  {
    path: '',
    component: AnaliticComponent,
    data: {
      title: 'Аналитика',
      expectedRole: [Roles.analitic]
    },
    canActivate: [AuthGuard, RoleGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnaliticRoutingModule { }
