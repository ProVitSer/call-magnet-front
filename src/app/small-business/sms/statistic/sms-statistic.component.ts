import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { SmsStatisticService } from './services/sms-statistic.service';

@Component({
    selector: 'app-sms-statistic',
    templateUrl: './sms-statistic.component.html',
    styleUrls: ['./sms-statistic.component.scss', '../../../../assets/sass/libs/datatables.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SmsStatisticComponent {
    public rows = [];
    public totalRecords = 0;
    public pageSize = 10;
    public currentPage = 1;
    public ColumnMode = ColumnMode;
    public expanded: any = {};
    private rowsTemp = [];
    public dateFilter;
    public dateString;
    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('tableRowDetails') tableRowDetails: any;
    @ViewChild('tableResponsive') tableResponsive: any;

    constructor(
        private readonly smsStatisticService: SmsStatisticService,
        private changeDetector: ChangeDetectorRef,
    ) {
        this.rowsTemp = this.rows;
    }

    async ngOnInit() {
        await this.loadSmsStatistic();
    }

    async loadSmsStatistic() {
        try {
            const response = await this.smsStatisticService.getSmsStatistic({
                page: this.currentPage.toString(),
                pageSize: this.pageSize.toString(),
                ...(this.dateString ? { dateString: this.dateString } : {}),
            });
            console.log(response);
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

        const response = await this.smsStatisticService.getSmsStatistic({
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

    onPageChange(pageInfo) {
        this.currentPage = pageInfo.offset + 1;
        this.loadSmsStatistic();
    }

    async onDateChange() {
        this.dateString = `${this.dateFilter.year}-${this.dateFilter.month}-${this.dateFilter.day}`;
        const response = await this.smsStatisticService.getSmsStatistic({
            page: this.currentPage.toString(),
            pageSize: this.pageSize.toString(),
            dateString: this.dateString,
        });

        this.rows = response.data;
        this.rowsTemp = response.data;
        this.totalRecords = response.totalRecords;
        this.changeDetector.detectChanges();
    }
}
