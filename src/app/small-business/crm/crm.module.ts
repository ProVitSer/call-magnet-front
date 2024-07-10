import { NgModule } from '@angular/core';
import { CrmSettingsComponent } from './components/settings/crm-settings.component';
import { CrmRoutingModule } from './crm-routing.module';


@NgModule({
  declarations: [CrmSettingsComponent],
  imports: [CrmRoutingModule],
  exports:[CrmSettingsComponent]
})
export class CrmModule { }
