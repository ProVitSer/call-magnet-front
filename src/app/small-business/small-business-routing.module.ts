import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardSmallBusinessComponent } from './dashboard-small-business/dashboard-small-business.component';



const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardSmallBusinessComponent,
        data: {
          title: 'Рабочий стол'
        }
      },
      {
        path: 'api',
        loadChildren: async () => (await import('./api/api.module')).ApiModule
      }, 
      {
        path: 'analitic',
        loadChildren: async () => (await import('./analitic/analitic.module')).AnaliticModule
      },
      {
        path: 'crm',
        loadChildren: async () => (await import('./crm/crm.module')).CrmModule
      },
      {
        path: 'auto-dial',
        loadChildren: async () => (await import('./auto-dial/auto-dial.module')).AutoDialModule
      },
      {
        path: 'sms',
        loadChildren: async () => (await import('./sms/sms.module')).SmsModule
      }, 
      {
        path: 'telegram',
        loadChildren: async () => (await import('./telegram/telegram.module')).TelegramModule
      }, 
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmallBusinessRoutingModule { }
