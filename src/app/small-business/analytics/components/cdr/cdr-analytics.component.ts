import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { CdrAnaliticsService } from './services/cdr-analitics.service';
import { format } from 'date-fns';

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

    rowDetailsToggleExpand(row) {
        this.tableRowDetails.rowDetail.toggleExpandRow(row);
    }

    toggleExpandRowResponsive(row) {
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
        this.rowsTemp = response.data;
        this.totalRecords = response.totalRecords;
        this.changeDetector.markForCheck();
    }

    async getVoiceFile(row: any) {
        try {
            if (row.recordingUrl) {
                window.URL.revokeObjectURL(row.recordingUrl);
                this.rowDetailsToggleExpand(row);
            }
        } catch (error) {
            SweetalertService.errorAlert('', 'Ошибка при загрузке звукового файла');
        }
    }

    async downloadVoiceFile(row: any) {
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

        const callIds = this.rows.map((r) => r.callId);
        const isUnique = callIds.filter((id) => id === row.callId).length === 1;

        return isUnique ? '' : { 'row-color': true };
    };
}
