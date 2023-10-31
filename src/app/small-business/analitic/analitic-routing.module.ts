import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnaliticComponent } from './components/analitic.component';


const routes: Routes = [
  {
    path: '',
    component: AnaliticComponent,
    data: {
      title: 'Аналитика'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnaliticRoutingModule { }
