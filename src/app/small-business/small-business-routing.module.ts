import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardSmallBusinessComponent } from './dashboard-small-business/dashboard-small-business.component';



const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardSmallBusinessComponent,
        data: {
          title: 'Dashboard'
        }
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmallBusinessRoutingModule { }
