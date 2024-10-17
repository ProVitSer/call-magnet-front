import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiComponent } from './components/api.component';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    component: ApiComponent,
    data: {
      title: '3CX API',
    },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiRoutingModule { }
