import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { TtsFilesService } from './service/tts-files..service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

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
            const response = await this.ttsFilesService.getTTSFiles({
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

        const response = await this.ttsFilesService.getTTSFiles({
            page: this.currentPage.toString(),
            pageSize: this.pageSize.toString(),
            name: val,
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
        this.loadTtsFiles();
    }

    async onDateChange() {
        this.dateString = `${this.dateFilter.year}-${this.dateFilter.month}-${this.dateFilter.day}`;
        const response = await this.ttsFilesService.getTTSFiles({
            page: this.currentPage.toString(),
            pageSize: this.pageSize.toString(),
            dateString: this.dateString,
        });

        this.rows = response.data;
        this.rowsTemp = response.data;
        this.totalRecords = response.totalRecords;
        this.changeDetector.detectChanges();
    }

    async getVoiceFile(row: any) {
        try {
            if (row.audioUrl) {
                window.URL.revokeObjectURL(row.audioUrl);
            }

            this.ttsFilesService.getTTSFile(row.ttsId).subscribe(
                (blob: Blob) => {
                    const audioUrl = URL.createObjectURL(blob);
                    row.audioUrl = this.sanitizer.bypassSecurityTrustUrl(audioUrl) as SafeUrl;
                    this.rowDetailsToggleExpand(row);
                },
                (error) => {
                    SweetalertService.errorAlert('', 'Ошибка при загрузке звукового файла');
                },
            );
        } catch (error) {
            SweetalertService.errorAlert('', 'Ошибка при загрузке звукового файла');
        }
    }

    downloadVoiceFile(row: any) {
        this.ttsFilesService.getTTSFile(row.ttsId).subscribe(
            (blob: Blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${row.name}.wav`;
                a.click();
                window.URL.revokeObjectURL(url);
            },
            (error) => {
                SweetalertService.errorAlert('', 'Ошибка при скачивании файла');
            },
        );
    }

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
                    await this.ttsFilesService.deleteTtsFile(row.ttsId);

                    Swal.fire('Удалено!', `Запись ${row.name} был успешно удален.`, 'success');

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
