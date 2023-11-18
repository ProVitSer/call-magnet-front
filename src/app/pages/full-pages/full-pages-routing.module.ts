import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersProfileComponent } from './users-profile/users-profile.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'profile',
        component: UsersProfileComponent,
        data: {
          title: 'Профиль'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule { }
