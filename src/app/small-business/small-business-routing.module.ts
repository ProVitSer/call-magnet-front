import { Routes } from '@angular/router';



export const SM_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: async () => (await import('./dashboard-small-business/dashboard-small-business.module')).DashboardSmallBusinessModule
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
    path: 'kpi',
    loadChildren: async () => (await import('./kpi/kpi.module')).KpiModule
  },
  {
    path: 'sms',
    loadChildren: async () => (await import('./sms/sms.module')).SmsModule
  }, 
  {
    path: 'telegram',
    loadChildren: async () => (await import('./telegram/telegram.module')).TelegramModule
  }, 
  {
    path: 'faq',
    loadChildren: async () => (await import('./faq/faq.module')).FaqModule
  }, 
  
];
