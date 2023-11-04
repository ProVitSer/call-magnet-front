import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardSmallBusinessComponent } from './components/dashboard-small-business.component';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { RoleGuard } from 'app/shared/auth/role-guard.service';


const routes: Routes = [
  {
    path: '',
    component: DashboardSmallBusinessComponent,
    data: {
      expectedRole: ['SmallBusiness']
    },
    canActivate: [AuthGuard, RoleGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardSmallBusinessRoutingModule { }
