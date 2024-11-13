import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { TtsFilesService } from './service/tts-files..service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { TTS_FILES, VOICE_URLS } from '../models/test-data';

@Component({
    selector: 'app-tts-files',
    templateUrl: './tts-files..component.html',
    styleUrls: ['./tts-files..component.scss', '../../../../assets/sass/libs/datatables.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TtsFilesComponent implements OnInit {
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
        private readonly ttsFilesService: TtsFilesService,
        private changeDetector: ChangeDetectorRef,
        private sanitizer: DomSanitizer,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.rowsTemp = this.rows;
    }

    async ngOnInit() {
        await this.loadTtsFiles();
    }

    async loadTtsFiles() {
        try {
            const response = TTS_FILES;

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

        const response = TTS_FILES;

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
        this.loadTtsFiles();
    }

    async onDateChange() {
        this.dateString = `${this.dateFilter.year}-${this.dateFilter.month}-${this.dateFilter.day}`;
        const response = TTS_FILES;

        this.rows = response.data;
        this.rowsTemp = response.data;
        this.totalRecords = response.totalRecords;
        this.changeDetector.detectChanges();
    }

    async getVoiceFile(row: any) {
        const url = VOICE_URLS[row.ttsId].url;
        window.URL.revokeObjectURL(url);
        row.audioUrl = url;
        this.rowDetailsToggleExpand(row);
    }

    downloadVoiceFile(row: any) {}

    async onDelete(row: any) {
        Swal.fire({
            title: 'Вы уверены?',
            text: `Вы хотите удалить запись ${row.name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Да, удалить!',
            cancelButtonText: 'Отмена',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    Swal.fire('Удалено!', `Запись ${row.name} была успешно удалена.`, 'success');

                    await this.loadTtsFiles();
                } catch (e) {
                    SweetalertService.errorAlert('', 'Ошибка удаления записи');
                }
            }
        });
    }

    async generateTtsFile() {
        this.router.navigate(['convert'], { relativeTo: this.route });
    }
}
