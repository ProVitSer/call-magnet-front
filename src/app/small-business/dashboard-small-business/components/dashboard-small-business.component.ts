import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
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
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { DashboardRequestService } from '../services/dashboard-request.service';
import ChartistTooltip from 'chartist-plugin-tooltips-updated';
import { DATA, pieChartColorScheme, pieChartSingle, THEME_COLORS } from './constaints';
import { Chart, ChartOptions } from './models/dashboard-small-business';

@Component({
    selector: 'app-dashboard-small-business',
    templateUrl: './dashboard-small-business.component.html',
    styleUrls: ['./dashboard-small-business.component.scss'],
})
export class DashboardSmallBusinessComponent implements OnInit, OnDestroy {
    ngDestroy$ = new Subject();
    xaxis: ApexXAxis;
    columnChartOptions: Partial<ChartOptions>;
    pieChartColorScheme = pieChartColorScheme;
    pieChartShowLabels = true;
    pieChartSingle = pieChartSingle;
    pieChartShowLegend = false;
    pieChartExplodeSlices = false;
    pieChartDoughnut = true;
    pieChartGradient = false;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dashboardRequestService: DashboardRequestService,
    ) {
        this.columnChartOptions = {
            chart: {
                height: 350,
                type: 'bar',
                toolbar: {
                    show: false,
                },
                animations: {
                    enabled: false,
                },
            },
            colors: THEME_COLORS,
            plotOptions: {
                bar: {
                    horizontal: false,
                    endingShape: 'rounded',
                    columnWidth: '25%',
                },
            },
            grid: {
                borderColor: '#BDBDBD44',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent'],
            },
            series: [
                {
                    name: 'Net Profit',
                    data: [40, 50, 110, 90, 85, 115, 100, 90],
                },
                {
                    name: 'Revenue',
                    data: [30, 40, 100, 80, 75, 105, 90, 80],
                },
            ],
            legend: {
                show: false,
            },
            xaxis: {
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                axisBorder: {
                    color: '#BDBDBD44',
                },
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return '$' + val + ' thousands';
                    },
                },
            },
        };
    }

    AllCalls: Chart = {
        type: 'Line',
        data: DATA['AllCalls'],
        options: {
            axisX: {
                showGrid: false,
                showLabel: false,
                offset: 0,
            },
            axisY: {
                showGrid: false,
                low: 40,
                showLabel: false,
                offset: 0,
            },
            plugins: [
                ChartistTooltip({
                    appendToBody: true,
                    currency: '$',
                    pointClass: 'ct-point-regular',
                }),
            ],
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0,
            }),
            fullWidth: true,
        },
    };

    ProcessedCalls: Chart = {
        type: 'Line',
        data: DATA['ProcessedCalls'],
        options: {
            axisX: {
                showGrid: false,
                showLabel: false,
                offset: 0,
            },
            axisY: {
                showGrid: false,
                low: 40,
                showLabel: false,
                offset: 0,
            },
            plugins: [
                ChartistTooltip({
                    appendToBody: true,
                    currency: '$',
                    pointClass: 'ct-point-regular',
                }),
            ],
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0,
            }),
            fullWidth: true,
        },
        events: {
            draw(data: any): void {
                if (data.type === 'point') {
                    const circle = new Chartist.Svg('circle', {
                        cx: data.x,
                        cy: data.y,
                        r: 4,
                        'ct:value': data.value.y,
                        'ct:meta': data.meta,
                        style: 'pointer-events: all !important',
                        class: 'ct-point-regular',
                    });
                    data.element.replace(circle);
                }
            },
        },
    };

    MissedCalls: Chart = {
        type: 'Line',
        data: DATA['MissedCalls'],
        options: {
            axisX: {
                showGrid: false,
                showLabel: false,
                offset: 0,
            },
            axisY: {
                showGrid: false,
                low: 40,
                showLabel: false,
                offset: 0,
            },
            plugins: [
                ChartistTooltip({
                    appendToBody: true,
                    currency: '$',
                    pointClass: 'ct-point-regular',
                }),
            ],
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0,
            }),
            fullWidth: true,
        },
        events: {
            draw(data: any): void {
                if (data.type === 'point') {
                    const circle = new Chartist.Svg('circle', {
                        cx: data.x,
                        cy: data.y,
                        r: 4,
                        'ct:value': data.value.y,
                        'ct:meta': data.meta,
                        style: 'pointer-events: all !important',
                        class: 'ct-point-regular',
                    });
                    data.element.replace(circle);
                }
            },
        },
    };

    AverageTalkTime: Chart = {
        type: 'Line',
        data: DATA['AverageTalkTime'],
        options: {
            axisX: {
                showGrid: false,
                showLabel: false,
                offset: 0,
            },
            axisY: {
                showGrid: false,
                low: 40,
                showLabel: false,
                offset: 0,
            },
            plugins: [
                ChartistTooltip({
                    appendToBody: true,
                    currency: '$',
                    pointClass: 'ct-point-regular',
                }),
            ],
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0,
            }),
            fullWidth: true,
        },
        events: {
            draw(data: any): void {
                if (data.type === 'point') {
                    const circle = new Chartist.Svg('circle', {
                        cx: data.x,
                        cy: data.y,
                        r: 4,
                        'ct:value': data.value.y,
                        'ct:meta': data.meta,
                        style: 'pointer-events: all !important',
                        class: 'ct-point-regular',
                    });
                    data.element.replace(circle);
                }
            },
        },
    };

    CallSchedule: Chart = {
        type: 'Line',
        data: DATA['CallSchedule'],
        options: {
            low: 0,
            showArea: true,
            fullWidth: true,
            onlyInteger: true,
            axisY: {
                low: 0,
                scaleMinSpace: 50,
            },
            axisX: {
                showGrid: false,
            },
        },
        events: {
            created(data: any): void {
                const defs = data.svg.elem('defs');
                defs.elem('linearGradient', {
                    id: 'gradient',
                    x1: 0,
                    y1: 1,
                    x2: 0,
                    y2: 0,
                })
                    .elem('stop', {
                        offset: 0,
                        'stop-opacity': '0.2',
                        'stop-color': 'rgba(255, 255, 255, 1)',
                    })
                    .parent()
                    .elem('stop', {
                        offset: 1,
                        'stop-opacity': '0.2',
                        'stop-color': 'rgba(181, 131, 255, 1)',
                    });
            },
            draw(data: any): void {
                const circleRadius = 6;
                if (data.type === 'point') {
                    const circle = new Chartist.Svg('circle', {
                        cx: data.x,
                        cy: data.y,
                        r: circleRadius,
                        class: 'ct-point-circle',
                    });
                    data.element.replace(circle);
                }
            },
        },
    };

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    onResized(event: any) {
        setTimeout(() => {
            this.fireRefreshEventOnWindow();
        }, 300);
    }

    fireRefreshEventOnWindow = function () {
        const evt = document.createEvent('HTMLEvents');
        evt.initEvent('resize', true, false);
        window.dispatchEvent(evt);
    };

    onSelect(event) {
        //your code here
    }
}
