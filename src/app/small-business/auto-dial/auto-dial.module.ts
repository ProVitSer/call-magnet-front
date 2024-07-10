import { NgModule } from '@angular/core';
import { AutoDialRoutingModule } from './auto-dial-routing.module';
import { AutoDialTasksComponent } from './components/tasks/tasks.component';
import { AutoDialSettingsComponent } from './components/settings/settings.component';
import { AutoDialReportsComponent } from './components/reports/reports.component';
import { AutoDialCreateComponent } from './components/create/create.component';


@NgModule({
  declarations: [AutoDialTasksComponent, AutoDialSettingsComponent, AutoDialReportsComponent, AutoDialCreateComponent],
  imports: [AutoDialRoutingModule],
  exports:[]
})
export class AutoDialModule { }
