import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnaliticComponent } from './components/analitic.component';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    component: AnaliticComponent,
    data: {
      title: 'Аналитика',
    },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnaliticRoutingModule { }
