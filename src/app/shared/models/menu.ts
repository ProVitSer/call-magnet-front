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
    // {
    //     code: 1,
    //     name: 'Информ панель',
    //     path: '/sm/dashboard',
    //     icon: 'ft-monitor',
    //     badge: '',
    //     badgeClass: '',
    //     externalLink: false,
    //     group: { lines: [] },
    // },

    {
        code: 11,
        name: 'VoIP мост',
        path: '/sm/voip',
        icon: 'ft-phone-call',
        badge: '',
        badgeClass: '',
        externalLink: false,
        group: {
            lines: [
                {
                    code: 1,
                    name: 'Настройки',
                    path: '/sm/voip/settings',
                    icon: 'ft-settings',
                    badge: '',
                    badgeClass: '',
                    externalLink: false,
                    group: { lines: [] },
                },
            ],
        },
    },

    {
        code: 12,
        name: 'FAQ',
        path: '/sm/faq',
        icon: 'icon-question',
        badge: '',
        badgeClass: '',
        externalLink: false,
        group: {
            lines: [],
        },
    },
    {
        code: 13,
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
        code: 1,
        path: '',
        name: 'Панель аналитики',
        icon: 'ft-bar-chart-2',
        badge: '',
        badgeClass: '',
        externalLink: false,
        group: {
            lines: [
                {
                    code: 1,
                    name: 'Аналитика',
                    path: '/sm/analytics/calls',
                    icon: 'ft-bar-chart-2',
                    badge: '',
                    badgeClass: '',
                    externalLink: false,
                    group: { lines: [] },
                },
                {
                    code: 2,
                    name: 'CDR',
                    path: '/sm/analytics/cdr',
                    icon: 'ft-phone-call',
                    badge: '',
                    badgeClass: '',
                    externalLink: false,
                    group: { lines: [] },
                },
            ],
        },
    },
];
export const CRM_MENU: Menu[] = [
    {
        code: 9,
        name: 'CRM',
        path: '',
        icon: 'ft-layout',
        badge: '',
        badgeClass: '',
        externalLink: false,
        group: {
            lines: [
                {
                    code: 1,
                    name: 'Настройки',
                    path: '/sm/crm/settings',
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

export const API_MENU: Menu[] = [
    {
        code: 3,
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

export const CQA_MENU: Menu[] = [
    {
        code: 6,
        name: 'KPI колл-центра',
        path: '',
        icon: 'ft-users',
        badge: '',
        badgeClass: '',
        externalLink: false,
        group: {
            lines: [
                {
                    code: 1,
                    name: 'Статистика',
                    path: '/sm/cqa/statistic',
                    icon: 'ft-align-left',
                    badge: '',
                    badgeClass: '',
                    externalLink: false,
                    group: { lines: [] },
                },
                {
                    code: 2,
                    name: 'Настройки',
                    path: '/sm/cqa/settings',
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

export const SMS_MENU: Menu[] = [
    {
        code: 8,
        name: 'SMS',
        path: '',
        icon: 'icon-speech',
        badge: '',
        badgeClass: '',
        externalLink: false,
        group: {
            lines: [
                {
                    code: 1,
                    name: 'Отправить',
                    path: '/sm/sms/send',
                    icon: 'icon-share-alt',
                    badge: '',
                    badgeClass: '',
                    externalLink: false,
                    group: { lines: [] },
                },
                {
                    code: 2,
                    name: 'Статистика',
                    path: '/sm/sms/statistic',
                    icon: 'ft-align-left',
                    badge: '',
                    badgeClass: '',
                    externalLink: false,
                    group: { lines: [] },
                },
                {
                    code: 3,
                    name: 'Настройки',
                    path: '/sm/sms/settings',
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

export const TELEGRAM_MENU: Menu[] = [
    {
        code: 10,
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

export const SMART_ROUTING_MENU: Menu[] = [
    {
        code: 4,
        path: '/sm/smart-routing',
        name: 'Умная маршрутизация',
        icon: 'icon-shuffle',
        badge: '',
        badgeClass: 'badge badge-pill badge-primary float-right mr-1 mt-1',
        externalLink: false,
        group: {
            lines: [],
        },
    },
];

export const MISSED_CALL_MENU: Menu[] = [
    {
        code: 5,
        path: '/sm/missed-call',
        name: 'Пропущенные вызовы',
        icon: 'ft-phone-missed',
        badge: '',
        badgeClass: 'badge badge-pill badge-primary float-right mr-1 mt-1',
        externalLink: false,
        group: {
            lines: [],
        },
    },
];

export const TTS_MENU: Menu[] = [
    {
        code: 7,
        path: '/sm/tts',
        name: 'Синтез речи',
        icon: 'ft-file-text',
        badge: '',
        badgeClass: 'badge badge-pill badge-primary float-right mr-1 mt-1',
        externalLink: false,
        group: {
            lines: [],
        },
    },
];

export const MENU_BY_PRODUCT_TYPE: { [prod in ProductType]?: Menu[] } = {
    [ProductType.analitic]: CALL_ANALITICS_MENU,
    [ProductType.api]: API_MENU,
    [ProductType.sm]: SMART_ROUTING_MENU,
    [ProductType.missedCall]: MISSED_CALL_MENU,
    [ProductType.cqa]: CQA_MENU,
    [ProductType.tts]: TTS_MENU,
    [ProductType.sms]: SMS_MENU,
    [ProductType.bitrix]: CRM_MENU,
    [ProductType.telegram]: TELEGRAM_MENU,
};
