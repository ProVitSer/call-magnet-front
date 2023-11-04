import { NgModule } from '@angular/core';
import { DashboardSmallBusinessComponent } from './components/dashboard-small-business.component';
import { DashboardSmallBusinessRoutingModule } from './dashboard-small-business-routing.module';

@NgModule({
  declarations: [DashboardSmallBusinessComponent],
  imports: [DashboardSmallBusinessRoutingModule],
  exports:[DashboardSmallBusinessComponent]
})
export class DashboardSmallBusinessModule { }
