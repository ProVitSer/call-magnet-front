import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TelegramNoAnswerCallComponent } from './components/no-answer-call/no-answer-call.component';
import { TelegramCallComponent } from './components/call/call.component';


const routes: Routes = [
  {
    path: 'no-answer-call',
    component: TelegramNoAnswerCallComponent,
    data: {
      title: 'Неотвеченные вызовы'
    },
  },
  {
    path: 'call',
    component: TelegramCallComponent,
    data: {
      title: 'Звонки'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TelegramRoutingModule { }
