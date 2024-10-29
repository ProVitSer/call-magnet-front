import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { CqaStatisticService } from './service/cqa-statistic.service';

@Component({
    selector: 'app-cqa-statistic',
    templateUrl: './cqa-statistic.component.html',
    styleUrls: ['./cqa-statistic.component.scss', '../../../../assets/sass/libs/datatables.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CqaStatisticComponent implements OnInit {
    public rows = [];
    public totalRecords = 0;
    public pageSize = 50;
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
        private readonly cqaStatisticService: CqaStatisticService,
        private changeDetector: ChangeDetectorRef,
    ) {
        this.rowsTemp = this.rows;
    }
    async ngOnInit() {
        await this.loadMessages();
    }
    async loadMessages() {
        try {
            const response = await this.cqaStatisticService.getCqaStatistic({
                page: this.currentPage.toString(),
                pageSize: this.pageSize.toString(),
                ...(this.dateString ? { dateString: this.dateString } : {}),
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
        const response = await this.cqaStatisticService.getCqaStatistic({
            page: this.currentPage.toString(),
            pageSize: this.pageSize.toString(),
            managerNumber: val,
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
        this.loadMessages();
    }

    async onDateChange() {
        this.dateString = `${this.dateFilter.year}-${this.dateFilter.month}-${this.dateFilter.day}`;
        const response = await this.cqaStatisticService.getCqaStatistic({
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
