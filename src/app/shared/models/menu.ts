import { ProductType } from './license';

export interface Menu {
    code: number;
    name: string;
    path: string;
    icon: string;
    badge: string;
    badgeClass: string;
    externalLink: boolean;
    group: Group;
}

export interface Group {
    lines: Menu[];
}

export const BASE_ROLE_MENU: Menu[] = [
    {
        code: 1,
        name: 'Панель управления',
        path: '/sm/dashboard',
        icon: 'ft-monitor',
        badge: '',
        badgeClass: '',
        externalLink: false,
        group: { lines: [] },
    },
    {
        code: 9,
        name: 'FAQ',
        path: '/sm/faq',
        icon: 'icon-question',
        badge: '',
        badgeClass: '',
        externalLink: false,
        group: { lines: [] },
    },
    {
        code: 10,
        name: 'Поддержка',
        path: 'https://icep.omnidesk.ru/',
        icon: 'ft-life-buoy',
        badge: '',
        badgeClass: '',
        externalLink: true,
        group: { lines: [] },
    },
];

export const CALL_ANALITICS_MENU: Menu[] = [
    {
        code: 2,
        path: '/sm/call-analytics',
        name: 'Аналитика',
        icon: 'ft-bar-chart-2',
        //badge: 'Новое',
        badge: '',
        // badgeClass: 'badge badge-pill badge-primary float-right mr-1 mt-1',
        badgeClass: '',
        externalLink: false,
        group: { lines: [] },
    },
];

// export const CRM_MENU: Menu[] = [
//     {
//         code: 3,
//         name: 'CRM',
//         path: '',
//         icon: 'ft-layout',
//         badge: '',
//         badgeClass: '',
//         externalLink: false,
//         group: {
//             lines: [
//                 {
//                     code: 1,
//                     name: 'Настройки',
//                     path: '/sm/crm/settings',
//                     icon: 'ft-settings',
//                     badge: '',
//                     badgeClass: '',
//                     externalLink: false,
//                     group: { lines: [] },
//                 },
//             ],
//         },
//     },
// ];

export const API_MENU: Menu[] = [
    {
        code: 4,
        path: '/sm/pbx-api',
        name: '3CX API',
        icon: 'ft-repeat',
        badge: 'Новое',
        badgeClass: 'badge badge-pill badge-primary float-right mr-1 mt-1',
        externalLink: false,
        group: {
            lines: [
                {
                    code: 1,
                    name: 'API',
                    path: '/sm/pbx-api/api',
                    icon: 'ft-share-2',
                    badge: '',
                    badgeClass: '',
                    externalLink: false,
                    group: { lines: [] },
                },
                {
                    code: 2,
                    name: 'Токен',
                    path: '/sm/pbx-api/token',
                    icon: 'icon-key',
                    badge: '',
                    badgeClass: '',
                    externalLink: false,
                    group: { lines: [] },
                },
                {
                    code: 3,
                    name: 'Настройки',
                    path: '/sm/pbx-api/settings',
                    icon: 'ft-settings',
                    badge: '',
                    badgeClass: '',
                    externalLink: false,
                    group: { lines: [] },
                },
            ],
        },
    },
];

// export const CQA_MENU: Menu[] = [
//     {
//         code: 6,
//         name: 'KPI колл-центра',
//         path: '',
//         icon: 'ft-users',
//         badge: '',
//         badgeClass: '',
//         externalLink: false,
//         group: {
//             lines: [
//                 {
//                     code: 1,
//                     name: 'Статистика',
//                     path: '/sm/cqa/statistic',
//                     icon: 'ft-align-left',
//                     badge: '',
//                     badgeClass: '',
//                     externalLink: false,
//                     group: { lines: [] },
//                 },
//                 {
//                     code: 2,
//                     name: 'Настройки',
//                     path: '/sm/cqa/settings',
//                     icon: 'ft-settings',
//                     badge: '',
//                     badgeClass: '',
//                     externalLink: false,
//                     group: { lines: [] },
//                 },
//             ],
//         },
//     },
// ];

// export const SMS_MENU: Menu[] = [
//     {
//         code: 7,
//         name: 'SMS',
//         path: '',
//         icon: 'icon-speech',
//         badge: '',
//         badgeClass: '',
//         externalLink: false,
//         group: {
//             lines: [
//                 {
//                     code: 1,
//                     name: 'Создать',
//                     path: '/sm/sms/send',
//                     icon: 'icon-share-alt',
//                     badge: '',
//                     badgeClass: '',
//                     externalLink: false,
//                     group: { lines: [] },
//                 },
//                 {
//                     code: 2,
//                     name: 'Массовая рассылка',
//                     path: '/sm/sms/mass-sending',
//                     icon: 'icon-users',
//                     badge: '',
//                     badgeClass: '',
//                     externalLink: false,
//                     group: { lines: [] },
//                 },
//                 {
//                     code: 3,
//                     name: 'Статистика',
//                     path: '/sm/sms/statistic',
//                     icon: 'ft-align-left',
//                     badge: '',
//                     badgeClass: '',
//                     externalLink: false,
//                     group: { lines: [] },
//                 },
//                 {
//                     code: 4,
//                     name: 'Настройки',
//                     path: '/sm/sms/settings',
//                     icon: 'ft-settings',
//                     badge: '',
//                     badgeClass: '',
//                     externalLink: false,
//                     group: { lines: [] },
//                 },
//             ],
//         },
//     },
// ];

export const TELEGRAM_MENU: Menu[] = [
    {
        code: 4,
        path: '/sm/tg',
        name: 'Telegram',
        icon: 'ft-send',
        badge: '',
        badgeClass: 'badge badge-pill badge-primary float-right mr-1 mt-1',
        externalLink: false,
        group: {
            lines: [
                {
                    code: 1,
                    name: 'Пользователи',
                    path: '/sm/tg/users',
                    icon: 'ft-users',
                    badge: '',
                    badgeClass: '',
                    externalLink: false,
                    group: { lines: [] },
                },
                {
                    code: 2,
                    name: 'Сообщения',
                    path: '/sm/tg/messages',
                    icon: 'ft-message-square',
                    badge: '',
                    badgeClass: '',
                    externalLink: false,
                    group: { lines: [] },
                },
                {
                    code: 3,
                    name: 'Настройки',
                    path: '/sm/tg/settings',
                    icon: 'ft-settings',
                    badge: '',
                    badgeClass: '',
                    externalLink: false,
                    group: { lines: [] },
                },
            ],
        },
    },
];

export const MENU_BY_PRODUCT_TYPE: { [prod in ProductType]?: Menu[] } = {
    [ProductType.api]: API_MENU,
    // [ProductType.sms]: SMS_MENU,
    // [ProductType.cqa]: CQA_MENU,
    // [ProductType.bitrix]: CRM_MENU,
    [ProductType.telegram]: TELEGRAM_MENU,
    // [ProductType.analitic]: CALL_ANALITICS_MENU,
};