import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { CallDetailsService } from './services/call-detail.service';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { CdrData } from '../cdr/models/cdr-analytic.model';
import * as d3 from 'd3';
import { CallDetailsData, STTProviderType, SttRecognizeStatus, TextDialogMessage } from './models/call-detail';
import { format, parse } from 'date-fns';

@Component({
    selector: 'app-call-detail',
    templateUrl: './call-detail.component.html',
    styleUrls: ['./call-detail.component.scss', '../../../../../assets/sass/libs/datatables.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CallDetailComponent implements OnInit {
    public callId: string | null = null;
    public totalRecords = 0;
    public pageSize = 10;
    public currentPage = 1;
    public rows = [];
    public ColumnMode = ColumnMode;
    public expanded: any = {};
    public userTimezoneOffset: number;
    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('tableRowDetails') tableRowDetails: any;
    @ViewChild('tableResponsive') tableResponsive: any;
    public isAccordionOpen: boolean[] = [];
    public callsDetail: CallDetailsData[] = [];
    constructor(
        private spinner: NgxSpinnerService,
        private changeDetector: ChangeDetectorRef,
        private route: ActivatedRoute,
        private readonly callDetailsService: CallDetailsService,
    ) {
        this.isAccordionOpen = Array(this.rows.length).fill(false);
        this.userTimezoneOffset = new Date().getTimezoneOffset() / -60;
    }

    async ngOnInit(): Promise<void> {
        this.route.paramMap.subscribe(async (params) => {
            this.callId = params.get('id');
            await this.loadCallData(this.callId);
        });
    }

    async loadCallData(callId: string) {
        try {
            this.showSpinner('call-details');

            const response = await this.callDetailsService.getCallData(callId);

            this.rows = this.adjustCallDates(response);

            this.totalRecords = response.length;

            if (response.length > 0) await this.getSttDialog(response);

            this.hideSpinner('call-details');

            this.changeDetector.detectChanges();
        } catch (e) {
            SweetalertService.errorAlert('', 'Ошибка загрузки данных');
        }
    }

    private async getSttDialog(data: CdrData[]) {
        const callsToProcess = data
            .filter((c) => c.recordingUrl)
            .map(async (call) => {
                const result = await this.callDetailsService.getSttDialog(String(call.segmentId));
                return {
                    ...call,
                    sttRecognizeStatus: result?.sttRecognizeStatus || SttRecognizeStatus.notRecognize,
                    textDialog: result?.textDialog ? this.formatTextDialog(result.textDialog) : [],
                };
            });
        this.callsDetail = await Promise.all(callsToProcess);
    }

    private formatTextDialog(textDialog: string[]): TextDialogMessage[] {
        return textDialog.map((item, index) => ({
            type: index % 2 === 0 ? 'received' : 'sent',
            text: item,
        }));
    }

    rowDetailsToggleExpand(row: CdrData) {
        this.tableRowDetails.rowDetail.toggleExpandRow(row);
    }

    toggleExpandRowResponsive(row: CdrData) {
        this.tableResponsive.rowDetail.toggleExpandRow(row);
    }

    async getVoiceFile(row: CdrData) {
        try {
            if (row.recordingUrl) {
                window.URL.revokeObjectURL(row.recordingUrl);
                this.rowDetailsToggleExpand(row);
            }
        } catch (error) {
            SweetalertService.errorAlert('', 'Ошибка при загрузке звукового файла');
        }
    }

    async downloadVoiceFile(row: CdrData) {
        if (row.recordingUrl) {
            const url = row.recordingUrl;
            const filename = url.split('/').pop();

            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.target = '_blank';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            SweetalertService.errorAlert('', 'Url записи вызова не валидна или запись отсутствует на сервере');
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async onPageChange(event: Event) {}

    async onTabChange(event: any) {
        if (event.nextId === 2) {
            this.removeCallFlow();

            this.showSpinner('call-flow');

            setTimeout(() => {
                this.drawCallFlow();
            }, 5000);
        }
    }

    private showSpinner(name: string) {
        this.spinner.show(name, {
            type: 'square-jelly-box',
            size: 'small',
            bdColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            fullScreen: false,
        });
    }

    private hideSpinner(name: string) {
        this.spinner.hide(name);
    }

    private removeCallFlow(): void {
        d3.select('app-bar-chart svg').remove();
    }

    private drawCallFlow() {
        const svg = d3.select('app-bar-chart').append('svg');

        const width = 1200;
        const height = 300;
        const margin = { top: 20, right: 20, bottom: 20, left: 20 };

        svg.attr('width', width).attr('height', height);

        const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

        // Сортируем данные по segmentId
        const sortedData = this.rows.sort((a, b) => a.segmentId - b.segmentId);

        // Определяем ширину и позицию блоков
        const blockWidth = 200;
        const blockHeight = 40;
        const blockSpacing = 100;

        // Определение маркера для стрелок
        svg.append('defs')
            .append('marker')
            .attr('id', 'arrow')
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', 10)
            .attr('refY', 0)
            .attr('markerWidth', 6)
            .attr('markerHeight', 6)
            .attr('orient', 'auto')
            .append('path')
            .attr('d', 'M0,-5L10,0L0,5')
            .attr('fill', 'rgba(0, 0, 0, 0.6)'); // Прозрачный чёрный цвет для стрелок

        let previousX = 0;
        const y = height / 2 - blockHeight / 2;

        // Стили для блоков
        const blockFillColor = '#f0f4f8'; // Светлый фон блока
        const blockBorderColor = '#007BFF'; // Синий цвет рамки блока

        // Рисуем первый блок для sourceCallerId
        g.append('rect')
            .attr('x', previousX)
            .attr('y', y)
            .attr('width', blockWidth)
            .attr('height', blockHeight)
            .attr('fill', blockFillColor)
            .attr('stroke', blockBorderColor)
            .attr('stroke-width', 2)
            .attr('rx', 10)
            .attr('ry', 10); // Закруглённые углы

        g.append('text')
            .attr('x', previousX + blockWidth / 2)
            .attr('y', y + blockHeight / 2)
            .attr('dy', '.35em')
            .attr('text-anchor', 'middle')
            .text(sortedData[0].sourceCallerId);

        // Рисуем остальные блоки для destinationDisplayName
        sortedData.forEach((item, index) => {
            const x = previousX + blockWidth + blockSpacing;

            // Рисуем блок с destinationDisplayName
            g.append('rect')
                .attr('x', x)
                .attr('y', y)
                .attr('width', blockWidth)
                .attr('height', blockHeight)
                .attr('fill', blockFillColor)
                .attr('stroke', blockBorderColor)
                .attr('stroke-width', 2)
                .attr('rx', 10)
                .attr('ry', 10); // Закруглённые углы

            g.append('text')
                .attr('x', x + blockWidth / 2)
                .attr('y', y + blockHeight / 2)
                .attr('dy', '.35em')
                .attr('text-anchor', 'middle')
                .text(item.destinationDisplayName);

            const lineY = y + blockHeight / 2;
            g.append('line')
                .attr('x1', previousX + blockWidth)
                .attr('y1', lineY)
                .attr('x2', x)
                .attr('y2', lineY)
                .attr('stroke', 'rgba(0, 0, 0, 0.4)') // Прозрачная линия
                .attr('stroke-width', 1.5)
                .attr('marker-end', 'url(#arrow)');

            // Добавляем иконку ringingDuration под линией
            g.append('text')
                .attr('x', (previousX + x) / 2 + 100)
                .attr('y', lineY + 20)
                .attr('text-anchor', 'middle')
                .text(`🔔 ${item.ringingDuration}`);

            // Добавляем иконку talkingDuration над линией
            g.append('text')
                .attr('x', (previousX + x) / 2 + 100)
                .attr('y', lineY - 10)
                .attr('text-anchor', 'middle')
                .text(`📞 ${item.talkingDuration}`);

            previousX = x;
        });

        this.hideSpinner('call-flow');
    }

    toggleAccordion(index: number, event: any) {
        if (event.target.className == 'header-content') {
            this.isAccordionOpen[index] = !this.isAccordionOpen[index];
        }
    }

    openDialog(index: number, event: Event) {
        event.stopPropagation();
        this.isAccordionOpen[index] = !this.isAccordionOpen[index];
    }

    async startRecognition(row: CallDetailsData) {
        if (row.sttRecognizeStatus == SttRecognizeStatus.notRecognize) {
            await this.callDetailsService.recognizeSpeech({
                recordingUrl: row.recordingUrl,
                applicationId: String(row.segmentId),
                sttProviderType: STTProviderType.sber,
            });

            SweetalertService.autoCloseSuccessAlert(
                '',
                'Распознавание может занять длительное время, отслеживайте статус готовности в панели напротив вызова',
                5000,
            );

            const index = this.callsDetail.findIndex((item) => item.segmentId === row.segmentId);

            if (index !== -1) {
                this.callsDetail[index].sttRecognizeStatus = SttRecognizeStatus.inProgress;
            }
            this.changeDetector.detectChanges();
        } else {
            SweetalertService.autoCloseSuccessAlert(
                '',
                'Диалог уже преобразован. Если нужно запустить распознавание заново, удалите запись и нажмите кнопку "Распознать"',
                5000,
            );
        }
    }

    getStatusLabel(status: SttRecognizeStatus): string {
        switch (status) {
            case SttRecognizeStatus.done:
                return 'Еще чуть-чуть';
            case SttRecognizeStatus.inProgress:
                return 'В процессе';
            case SttRecognizeStatus.error:
                return 'Ошибка';
            case SttRecognizeStatus.completed:
                return 'Завершено';
            default:
                return 'Не распознан';
        }
    }

    async refresh(row: CdrData) {
        const result = await this.callDetailsService.getSttDialog(String(row.segmentId));

        if (result) {
            const index = this.callsDetail.findIndex((item) => item.segmentId === row.segmentId);

            if (index !== -1) {
                this.callsDetail[index].sttRecognizeStatus = result.sttRecognizeStatus;
                this.callsDetail[index].textDialog = result.textDialog ? this.formatTextDialog(result.textDialog) : [];
            }

            this.changeDetector.detectChanges();
        }
    }

    async deleteStt(row: CallDetailsData) {
        if (row.sttRecognizeStatus == SttRecognizeStatus.completed) {
            await this.callDetailsService.deleteSttDialog(String(row.segmentId));

            const index = this.callsDetail.findIndex((item) => item.segmentId === row.segmentId);

            if (index !== -1) {
                this.callsDetail[index].sttRecognizeStatus = SttRecognizeStatus.notRecognize;
                this.callsDetail[index].textDialog = [];
            }

            this.changeDetector.detectChanges();
        }
    }

    private adjustCallDates(data: CdrData[]): CdrData[] {
        return data.map((entry) => {
            const date = parse(entry.callDate, 'dd.MM.yyyy HH:mm:ss', new Date());

            date.setHours(date.getHours() + this.userTimezoneOffset);

            const adjustedDate = format(date, 'dd.MM.yyyy HH:mm:ss');

            return { ...entry, callDate: adjustedDate };
        });
    }
}
