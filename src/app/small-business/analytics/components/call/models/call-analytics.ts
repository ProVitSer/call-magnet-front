import { ChartEvent, ChartType } from 'ng-chartist';
import {
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexYAxis,
    ApexGrid,
    ApexDataLabels,
    ApexStroke,
    ApexTitleSubtitle,
    ApexTooltip,
    ApexLegend,
    ApexPlotOptions,
    ApexFill,
    ApexMarkers,
    ApexTheme,
    ApexNonAxisChartSeries,
    ApexResponsive,
} from 'ng-apexcharts';

export interface Chart {
    type: ChartType;
    data: Chartist.IChartistData;
    options?: any;
    responsiveOptions?: any;
    events?: ChartEvent;
}

export type ChartOptions = {
    series: ApexAxisChartSeries | ApexNonAxisChartSeries;
    colors: string[];
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis | ApexYAxis[];
    title: ApexTitleSubtitle;
    dataLabels: ApexDataLabels;
    stroke: ApexStroke;
    grid: ApexGrid;
    legend?: ApexLegend;
    tooltip?: ApexTooltip;
    plotOptions?: ApexPlotOptions;
    labels?: string[];
    fill: ApexFill;
    markers?: ApexMarkers;
    theme: ApexTheme;
    responsive: ApexResponsive[];
};

export interface CallAnanliticsData {
    totalDailyCalls: number;
    totalDailyAnsweredCalls: number;
    totalDailyUnansweredCalls: number;
    averageDailyTalkTime: string;
    extensionDaliyStatistic: {
        maxInboundUnanswered: {
            callTalkingDur: string;
            id: number;
            extension: string;
            displayName: string;
            inboundAnsweredCount: number;
            inboundUnansweredCount: number;
            outboundCallCount: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        maxCallTalkingDur: {
            callTalkingDur: string;
            id: number;
            extension: string;
            displayName: string;
            inboundAnsweredCount: number;
            inboundUnansweredCount: number;
            outboundCallCount: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        maxInboundAnswered: {
            callTalkingDur: string;
            id: number;
            extension: string;
            displayName: string;
            inboundAnsweredCount: number;
            inboundUnansweredCount: number;
            outboundCallCount: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    };
    dayCallScheduleByHour: {
        answered: number[];
        unanswered: number[];
    };
    lastSevenDaysCalls: Record<
        string,
        {
            answered: number;
            unanswered: number;
        }
    >[];
    dayRegionCall: {
        name: string;
        value: number;
    }[];
}
