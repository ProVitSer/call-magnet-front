import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrmSettingsComponent } from './components/settings/crm-settings.component';


const routes: Routes = [
  {
    path: 'settings',
    component: CrmSettingsComponent,
    data: {
      title: 'Настройки'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmRoutingModule { }
