export const TTS_FILES = {
    data: [
        {
            name: 'IVR Отдел Продаж',
            ttsId: 1731527616,
            ttsProviderType: 'yandex',
            text: 'Добрый день.\nСпасибо за звонок нашу компанию, наберите внутренний номер абонента или оставайтесь на линии',
            date: '2024-11-13',
        },
        {
            name: 'Тестовый синтез от Сбер',
            ttsId: 1731527554,
            ttsProviderType: 'sber',
            text: 'Тестовый синтез речи от Сбера',
            date: '2024-11-13',
        },
        {
            name: 'Синтез',
            ttsId: 1731527516,
            ttsProviderType: 'yandex',
            text: 'Тестовый синтез речи от Яндекс',
            date: '2024-11-13',
        },
    ],
    totalRecords: 3,
};

export const VOICE_URLS = {
    1731527616: {
        url: 'https://storage.yandexcloud.net/pac-datapub/IVR%20%D0%9E%D1%82%D0%B4%D0%B5%D0%BB%20%D0%9F%D1%80%D0%BE%D0%B4%D0%B0%D0%B6.wav',
    },
    1731527554: {
        url: 'https://storage.yandexcloud.net/pac-datapub/%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D1%8B%D0%B9%20%D1%81%D0%B8%D0%BD%D1%82%D0%B5%D0%B7%20%D0%BE%D1%82%20%D0%A1%D0%B1%D0%B5%D1%80.wav',
    },
    1731527516: {
        url: 'https://storage.yandexcloud.net/pac-datapub/%D0%A1%D0%B8%D0%BD%D1%82%D0%B5%D0%B7.wav',
    },
};

export const VOICES_YANDEX = [
    {
        name: 'alena',
        emotions: ['neutral', 'good'],
    },
    {
        name: 'filipp',
        emotions: ['neutral'],
    },
    {
        name: 'jane',
        emotions: ['neutral', 'good', 'evil'],
    },
    {
        name: 'omazh',
        emotions: ['neutral', 'evil'],
    },
    {
        name: 'zahar',
        emotions: ['neutral', 'good'],
    },
    {
        name: 'ermil',
        emotions: ['neutral', 'good'],
    },
    {
        name: 'amira',
        emotions: ['neutral'],
    },
    {
        name: 'john',
        emotions: ['neutral'],
    },
];

export const VOICES_SBER = [
    {
        name: 'Nec',
        emotions: ['neutral'],
    },
    {
        name: 'Bys',
        emotions: ['neutral'],
    },
    {
        name: 'May',
        emotions: ['neutral'],
    },
    {
        name: 'Tur',
        emotions: ['neutral'],
    },
    {
        name: 'Ost',
        emotions: ['neutral'],
    },
    {
        name: 'Pon',
        emotions: ['neutral'],
    },
    {
        name: 'Kin',
        emotions: ['neutral'],
    },
];
