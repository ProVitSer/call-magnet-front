import { Routes } from '@angular/router';



export const SM_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: async () => (await import('./dashboard-small-business/dashboard-small-business.module')).DashboardSmallBusinessModule
  }, 
  {
    path: 'pbx-api',
    loadChildren: async () => (await import('./pbx-api/pbx-api.module')).PbxApiModule
  }, 
  {
    path: 'faq',
    loadChildren: async () => (await import('./faq/faq.module')).FaqModule
  }, 
  
];
