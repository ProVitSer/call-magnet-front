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
