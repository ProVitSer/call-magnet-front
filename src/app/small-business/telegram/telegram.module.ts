import { NgModule } from '@angular/core';
import { TelegramNoAnswerCallComponent } from './components/no-answer-call/no-answer-call.component';
import { TelegramRoutingModule } from './telegram-routing.module';
import { TelegramCallComponent } from './components/call/call.component';


@NgModule({
  declarations: [TelegramNoAnswerCallComponent, TelegramCallComponent],
  imports: [TelegramRoutingModule],
  exports:[]
})
export class TelegramModule { }
