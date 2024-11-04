import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { CdrAnaliticsService } from './services/cdr-analitics.service';
import { format } from 'date-fns';
import { CdrData } from './models/cdr-analytics';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-cdr-analytics',
    templateUrl: './cdr-analytics.component.html',
    styleUrls: ['./cdr-analytics.component.scss', '../../../../../assets/sass/libs/datatables.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdrAnalyticsComponent implements OnInit {
    public rows = [];
    public totalRecords = 0;
    public pageSize = 10;
    public currentPage = 1;
    public ColumnMode = ColumnMode;
    public expanded: any = {};
    private rowsTemp = [];
    public dateFilter;
    public dateString;
    private rowsDefaultCollor = true;
    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('tableRowDetails') tableRowDetails: any;
    @ViewChild('tableResponsive') tableResponsive: any;

    constructor(
        private changeDetector: ChangeDetectorRef,
        private readonly cdrAnaliticsService: CdrAnaliticsService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.rowsTemp = this.rows;
    }

    async ngOnInit() {
        await this.loadCdr();
    }

    async loadCdr() {
        try {
            const response = await this.cdrAnaliticsService.getCdr({
                page: this.currentPage.toString(),
                pageSize: this.pageSize.toString(),
                ...(this.dateString ? { dateString: this.dateString } : { dateString: format(new Date(), 'yyyy-MM-dd') }),
            });

            this.rows = response.data;

            this.rowsTemp = response.data;

            this.totalRecords = response.totalRecords;

            this.changeDetector.detectChanges();
        } catch (e) {
            SweetalertService.errorAlert('', 'Ошибка загрузки данных');
        }
    }

    rowDetailsToggleExpand(row: CdrData) {
        this.tableRowDetails.rowDetail.toggleExpandRow(row);
    }

    toggleExpandRowResponsive(row: CdrData) {
        this.tableResponsive.rowDetail.toggleExpandRow(row);
    }

    async MultiPurposeFilterUpdate(event) {
        const val = event.target.value.toLowerCase();

        const response = await this.cdrAnaliticsService.getCdr({
            page: this.currentPage.toString(),
            pageSize: this.pageSize.toString(),
            phoneNumber: val,
        });

        this.rows = response.data;
        this.rowsTemp = response.data;
        this.totalRecords = response.totalRecords;
        this.changeDetector.detectChanges();

        const temp = this.rowsTemp.filter(function (d) {
            return d.externalNumber.toLowerCase().indexOf(val) !== -1;
        });

        this.rows = temp;
        this.table.offset = 0;
    }

    async onPageChange(pageInfo) {
        this.currentPage = pageInfo.offset + 1;
        this.loadCdr();
    }

    async onDateChange() {
        this.dateString = `${this.dateFilter.year}-${this.dateFilter.month}-${this.dateFilter.day}`;
        const response = await this.cdrAnaliticsService.getCdr({
            page: this.currentPage.toString(),
            pageSize: this.pageSize.toString(),
            dateString: this.dateString,
        });

        this.rows = response.data;
        this.colorizeRows(this.rows);

        this.rowsTemp = response.data;
        this.totalRecords = response.totalRecords;
        this.changeDetector.markForCheck();
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

    getRowClass = (row) => {
        if (!this.rows || this.rows.length === 0) {
            return '';
        }

        return row.color ? { 'row-color': true } : '';
    };

    private colorizeRows(rows: any) {
        const colors = [true, false];
        const callIdColorMap = {};
        let currentColorIndex = 0;

        return rows.map((call) => {
            const { callId } = call;

            if (callIdColorMap.hasOwnProperty(callId)) {
                call.color = callIdColorMap[callId];
            } else {
                const color = colors[currentColorIndex];
                call.color = color;

                callIdColorMap[callId] = color;

                currentColorIndex = 1 - currentColorIndex;
            }

            return call;
        });
    }

    analyzeCall(rows: CdrData) {
        this.redirectToCall(rows.callId);
    }

    redirectToCall(callId: number) {
        this.router.navigate([`/sm/analytics/call/${callId}`]);
    }
}
