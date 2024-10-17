import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TelegramNoAnswerCallComponent } from './components/no-answer-call/no-answer-call.component';
import { TelegramCallComponent } from './components/call/call.component';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';


const routes: Routes = [
  {
    path: 'no-answer-call',
    component: TelegramNoAnswerCallComponent,
    data: {
      title: 'Неотвеченные вызовы',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'call',
    component: TelegramCallComponent,
    data: {
      title: 'Звонки',
    },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TelegramRoutingModule { }
