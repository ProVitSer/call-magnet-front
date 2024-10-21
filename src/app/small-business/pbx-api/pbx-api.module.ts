import { NgModule } from '@angular/core';
import { PbxApiComponent } from './components/pbx-api.component';
import { PbxApiRoutingModule } from './pbx-api-routing.module';


@NgModule({
  declarations: [PbxApiComponent],
  imports: [PbxApiRoutingModule],
  exports:[PbxApiComponent]
})
export class PbxApiModule { }
