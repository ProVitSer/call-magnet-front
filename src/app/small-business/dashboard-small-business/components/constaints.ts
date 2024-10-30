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
        labels: [1, 2, 3, 4, 5, 6, 7, 8],
        series: [
            [0, 5, 15, 8, 15, 9, 30, 0],
            [0, 3, 5, 2, 8, 1, 5, 0],
        ],
    },
};

const $info = '#2F8BE6',
    $info_light = '#ACE0FC';
export const THEME_COLORS = [$info, $info_light];

export const pieChartSingle = [
    {
        name: 'Germany',
        value: 894,
    },
    {
        name: 'USA',
        value: 500,
    },
    {
        name: 'France',
        value: 720,
    },
];

export const pieChartColorScheme = {
    domain: ['#009DA0', '#FF8D60', '#FF586B', '#AAAAAA'],
};
