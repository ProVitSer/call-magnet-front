export const DATA = {
    AllCalls: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        series: [[50, 45, 60, 55, 70, 55, 60, 55, 65, 57]],
    },
    ProcessedCalls: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        series: [[80, 60, 70, 50, 60, 53, 71, 48, 65, 60]],
    },
    MissedCalls: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        series: [[45, 55, 51, 65, 50, 62, 58, 70, 48, 57]],
    },
    AverageTalkTime: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        series: [[70, 55, 90, 49, 65, 60, 78, 55, 80, 68]],
    },
    CallSchedule: {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        series: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 15, 8, 15, 9, 30, 50, 11, 14, 22, 30, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 5, 2, 8, 1, 5, 0, 2, 8, 1, 5, 0, 0],
        ],
    },
};

const $info = '#BDF8B6',
    $info_light = '#FECBBA';
export const THEME_COLORS = [$info, $info_light];

export const pieChartSingle = [
    {
        name: 'Москва',
        value: 894,
    },
    {
        name: 'Московская область',
        value: 500,
    },
    {
        name: 'Самара',
        value: 500,
    },
    {
        name: 'Тамбов',
        value: 5,
    },
    {
        name: 'Челябинск',
        value: 100,
    },
    {
        name: 'Екатеринбург',
        value: 650,
    },
];

export const pieChartColorScheme = {
    domain: ['#975AFF', '#40C057', '#F55252', '#2F8BE6', '#F77E17', '#616D89', '#9e9e9e', '#0C5C38'],
};
