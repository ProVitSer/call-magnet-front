import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorPageComponent } from "./error/error-page.component";
import { ForgotPasswordPageComponent } from "./forgot-password/forgot-password-page.component";
import { LoginPageComponent } from "./login/login-page.component";
import { VerifyPageComponent } from './verify/verify-page.component';
import { ResetPasswordPageComponent } from './reset-password/reset-password-page.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'error',
        component: ErrorPageComponent,
        data: {
          title: 'Error'
        }
      },
      {
        path: 'forgotpassword',
        component: ForgotPasswordPageComponent,
        data: {
          title: 'Восстановление пароля'
        }
      },   
      
      {
        path: 'login',
        component: LoginPageComponent,
        data: {
          title: 'Авторизация'
        }
      },
      {
        path: 'verify/:id',
        component: VerifyPageComponent,
        data: {
          title: ''
        }
      },
      {
        path: 'reset-password/:id',
        component: ResetPasswordPageComponent,
        data: {
          title: ''
        }
      }   
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPagesRoutingModule { }
