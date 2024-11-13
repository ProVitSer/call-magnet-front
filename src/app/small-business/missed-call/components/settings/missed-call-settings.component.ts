import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { MissedCallService } from './services/missed-call.service';
import { MC } from './models/test-data';

@Component({
    selector: 'app-missed-call-settings',
    templateUrl: './missed-call-settings.component.html',
    styleUrls: ['./missed-call-settings.component.scss', '../../../../../assets/sass/libs/datatables.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class MissedCallSettingsComponent implements OnInit, AfterViewInit {
    public rows = [];
    public ColumnMode = ColumnMode;
    missedServiceType = '';
    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('tablesMC') tablesSM: any;

    constructor(
        private readonly missedCallService: MissedCallService,
        private changeDetector: ChangeDetectorRef,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {}

    ngAfterViewInit() {
        this.getMCConfig();
    }

    async getMCConfig() {
        try {
            const data = MC;

            this.rows = data;

            this.changeDetector.detectChanges();
        } catch (e) {
            SweetalertService.errorAlert('', 'Ошибка загрузки данных');
        }
    }

    async addMissedCallConfig() {
        this.router.navigate(['add'], { relativeTo: this.route });
    }

    async onDelete(row: any) {
        Swal.fire({
            title: 'Вы уверены?',
            text: `Вы хотите удалить маршрутизацию ${row.trunkName}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Да, удалить!',
            cancelButtonText: 'Отмена',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    Swal.fire('Удалено!', `Маршрутизация по номеру  ${row.trunkName} была успешно удалена.`, 'success');

                    this.getMCConfig();
                } catch (e) {
                    SweetalertService.errorAlert('', 'Ошибка удаления маршрутизации');
                }
            }
        });
    }
}
