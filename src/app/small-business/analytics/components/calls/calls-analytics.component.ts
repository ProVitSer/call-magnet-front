import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ApexXAxis } from 'ng-apexcharts';
import { Subject } from 'rxjs';
import ChartistTooltip from 'chartist-plugin-tooltips-updated';
import { WIDGET_СРФКЕ_DATA } from './constaints';
import { CallAnanliticsData, Chart, ChartOptions } from './models/calls-analytics';
import { CallsAnaliticsService } from './services/calls-analytics.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-calls-analytics',
    templateUrl: './calls-analytics.component.html',
    styleUrls: ['./calls-analytics.component.scss'],
})
export class CallsAnalyticsComponent implements OnInit, OnDestroy {
    ngDestroy$ = new Subject();
    AllCallsWidget: Chart;
    ProcessedCallsWidget: Chart;
    MissedCallsWidget: Chart;
    AverageTalkTimeWidget: Chart;
    xaxis: ApexXAxis;
    weeklyLineChart: Partial<ChartOptions>;
    CallSchedule: Partial<Chart>;
    regionCallStatisticChartColorScheme = {
        domain: ['#975AFF', '#40C057', '#F55252', '#2F8BE6', '#F77E17', '#616D89', '#9e9e9e', '#0C5C38'],
    };
    regionCallStatisticChartShowLabels = true;
    regionCallStatisticData: {
        name: string;
        value: number;
    }[] = [{ name: '', value: 0 }];
    regionCallStatisticChartShowLegend = true;
    regionCallStatisticChartExplodeSlices = false;
    regionCallStatisticChartDoughnut = true;
    regionCallStatisticChartGradient = true;
    totalCalls = 0;
    processedCalls = 0;
    missedCalls = 0;
    averageTalkTime = '00:00:00';
    maxInboundAnswered: {
        callTalkingDur: string;
        id: number;
        extension: string;
        displayName: string;
        inboundAnsweredCount: number;
        inboundUnansweredCount: number;
        outboundCallCount: number;
    }[] = [
        {
            id: 4839,
            extension: '204',
            displayName: 'Московский',
            inboundAnsweredCount: 0,
            inboundUnansweredCount: 0,
            outboundCallCount: 0,
            callTalkingDur: '00:00:00',
        },
    ];
    maxCallTalkingDur: {
        callTalkingDur: string;
        id: number;
        extension: string;
        displayName: string;
        inboundAnsweredCount: number;
        inboundUnansweredCount: number;
        outboundCallCount: number;
    }[] = [
        {
            id: 4839,
            extension: '204',
            displayName: 'Московский',
            inboundAnsweredCount: 0,
            inboundUnansweredCount: 0,
            outboundCallCount: 0,
            callTalkingDur: '00:00:00',
        },
    ];
    maxInboundUnanswered: {
        callTalkingDur: string;
        id: number;
        extension: string;
        displayName: string;
        inboundAnsweredCount: number;
        inboundUnansweredCount: number;
        outboundCallCount: number;
    }[] = [
        {
            id: 4839,
            extension: '204',
            displayName: 'Московский',
            inboundAnsweredCount: 0,
            inboundUnansweredCount: 0,
            outboundCallCount: 0,
            callTalkingDur: '00:00:00',
        },
    ];
    isDataLoaded = false;

    constructor(
        private callsAnaliticsService: CallsAnaliticsService,
        private spinner: NgxSpinnerService,
        private changeDetector: ChangeDetectorRef,
    ) {}

    async ngOnInit(): Promise<void> {
        this.spinner.show(undefined, {
            type: 'square-jelly-box',
            size: 'small',
            bdColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            fullScreen: false,
        });
        const data = await this.callsAnaliticsService.getCallAnalitics();

        this.regionCallStatisticData = data.dayRegionCall;

        this.totalCalls = data.totalDailyCalls;
        this.processedCalls = data.totalDailyAnsweredCalls;
        this.missedCalls = data.totalDailyUnansweredCalls;
        this.averageTalkTime = data.averageDailyTalkTime;
        this.maxInboundAnswered = data.extensionDaliyStatistic.maxInboundAnswered;
        this.maxCallTalkingDur = data.extensionDaliyStatistic.maxCallTalkingDur;
        this.maxInboundUnanswered = data.extensionDaliyStatistic.maxInboundUnanswered;

        this.initWidgets();
        this.initWeeklyLineChart(data);
        this.initCallSchedule(data);
        this.isDataLoaded = true;
        this.spinner.hide();
        this.changeDetector.detectChanges();
    }

    private transformData(data: Record<string, { answered: number; unanswered: number }>[]) {
        const category: string[] = [];
        const answered: number[] = [];
        const unanswered: number[] = [];

        data.forEach((dayData) => {
            const date = Object.keys(dayData)[0];
            const { answered: answeredCount, unanswered: unansweredCount } = dayData[date];

            category.push(date);
            answered.push(answeredCount);
            unanswered.push(unansweredCount);
        });

        return { category, answered, unanswered };
    }

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

    onSelect(event) {}

    private initCallSchedule(data: CallAnanliticsData) {
        this.CallSchedule = {
            type: 'Line',
            data: {
                labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                series: [[...data.dayCallScheduleByHour.answered], [...data.dayCallScheduleByHour.unanswered]],
            },
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
                plugins: [
                    ChartistTooltip({
                        appendToBody: true,
                        pointClass: 'ct-point-circle',
                    }),
                ],
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
                    const circleRadius = 4;
                    if (data.type === 'point') {
                        const circle = new Chartist.Svg('circle', {
                            cx: data.x,
                            cy: data.y,
                            r: circleRadius,
                            'ct:value': data.value.y,
                            'ct:meta': data.meta,
                            style: 'pointer-events: all !important',
                            class: 'ct-point-circle',
                        });
                        data.element.replace(circle);
                    } else if (data.type === 'label') {
                        const dX = data.width / 2 + (30 - data.width);
                        data.element.attr({ x: data.element.attr('x') - dX });
                    }
                },
            },
        };
    }

    private initWeeklyLineChart(data: CallAnanliticsData) {
        const columnChartOptionsData = this.transformData(data.lastSevenDaysCalls);

        this.weeklyLineChart = {
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
            colors: ['#BDF8B6', '#FECBBA'],
            plotOptions: {
                bar: {
                    horizontal: false,
                    endingShape: 'rounded',
                    columnWidth: '50%',
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
                    name: 'Обработанные вызовы',
                    data: columnChartOptionsData.answered,
                },
                {
                    name: 'Пропущенные вызовы',
                    data: columnChartOptionsData.unanswered,
                },
            ],
            legend: {
                show: false,
            },
            xaxis: {
                categories: columnChartOptionsData.category,
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

    private initWidgets() {
        this.AllCallsWidget = {
            type: 'Line',
            data: WIDGET_СРФКЕ_DATA['AllCallsWidget'],
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

        this.ProcessedCallsWidget = {
            type: 'Line',
            data: WIDGET_СРФКЕ_DATA['ProcessedCallsWidget'],
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

        this.MissedCallsWidget = {
            type: 'Line',
            data: WIDGET_СРФКЕ_DATA['MissedCallsWidget'],
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

        this.AverageTalkTimeWidget = {
            type: 'Line',
            data: WIDGET_СРФКЕ_DATA['AverageTalkTimeWidget'],
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
    }
}
