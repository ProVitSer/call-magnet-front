import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiComponent } from './components/api.component';


const routes: Routes = [
  {
    path: '',
    component: ApiComponent,
    data: {
      title: '3CX API'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiRoutingModule { }
