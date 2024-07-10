import { NgModule } from '@angular/core';
import { KpiRoutingModule } from './kpi-routing.module';
import { KpiSettingsComponent } from './components/settings/kpi-settings.component';
import { KpiStatisticComponent } from './components/statistic/kpi-statistic.component';


@NgModule({
  declarations: [KpiSettingsComponent, KpiStatisticComponent],
  imports: [KpiRoutingModule],
  exports:[]
})
export class KpiModule { }
