import { NgModule } from '@angular/core';
import { ApiComponent } from './components/api.component';
import { ApiRoutingModule } from './api-routing.module';


@NgModule({
  declarations: [ApiComponent],
  imports: [ApiRoutingModule],
  exports:[]
})
export class ApiModule { }
