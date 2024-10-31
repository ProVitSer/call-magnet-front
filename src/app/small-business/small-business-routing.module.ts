import { Routes } from '@angular/router';

export const SM_ROUTES: Routes = [
    {
        path: 'analytics',
        loadChildren: async () => (await import('./analytics/analytics.module')).AnalyticsModule,
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
        path: 'smart-routing',
        loadChildren: async () => (await import('./smart-routing/smart-routing.module')).SmartRoutingModule,
    },
    {
        path: 'missed-call',
        loadChildren: async () => (await import('./missed-call/missed-call.module')).MissedCallModule,
    },
    {
        path: 'crm',
        loadChildren: async () => (await import('./crm/crm.module')).CrmModule,
    },
    {
        path: 'sms',
        loadChildren: async () => (await import('./sms/sms.module')).SmsModule,
    },
    {
        path: 'faq',
        loadChildren: async () => (await import('./faq/faq.module')).FaqModule,
    },
    {
        path: 'tts',
        loadChildren: async () => (await import('./tts/tts.module')).TtsModule,
    },
    {
        path: 'cqa',
        loadChildren: async () => (await import('./cqa/cqa.module')).CqaModule,
    },
];
