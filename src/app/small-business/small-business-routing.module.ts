import { Routes } from '@angular/router';

export const SM_ROUTES: Routes = [
    {
        path: 'dashboard',
        loadChildren: async () => (await import('./dashboard-small-business/dashboard-small-business.module')).DashboardSmallBusinessModule,
    },
    {
        path: 'pbx-api',
        loadChildren: async () => (await import('./pbx-api/pbx-api.module')).PbxApiModule,
    },
    {
        path: 'tg',
        loadChildren: async () => (await import('./tg/tg.module')).TgModule,
    },
    {
        path: 'voip',
        loadChildren: async () => (await import('./voip/voip.module')).VoipModule,
    },
    {
        path: 'sms',
        loadChildren: async () => (await import('./sms/sms.module')).SmsModule,
    },
    {
        path: 'faq',
        loadChildren: async () => (await import('./faq/faq.module')).FaqModule,
    },
];
