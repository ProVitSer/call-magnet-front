import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TelegramNoAnswerCallComponent } from './components/no-answer-call/no-answer-call.component';
import { TelegramCallComponent } from './components/call/call.component';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { RoleGuard } from 'app/shared/auth/role-guard.service';
import { Roles } from 'app/shared/models/user';


const routes: Routes = [
  {
    path: 'no-answer-call',
    component: TelegramNoAnswerCallComponent,
    data: {
      title: 'Неотвеченные вызовы',
      expectedRole: [Roles.telegram]
    },
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'call',
    component: TelegramCallComponent,
    data: {
      title: 'Звонки',
      expectedRole: [Roles.telegram]
    },
    canActivate: [AuthGuard, RoleGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TelegramRoutingModule { }
