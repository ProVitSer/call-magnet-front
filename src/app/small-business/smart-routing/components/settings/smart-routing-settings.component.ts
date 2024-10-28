import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { SmartRoutingService } from './services/smart-routing.service';
import { SmartRoutingConfigData } from './models/smart-routing.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-smart-routing-settings',
    templateUrl: './smart-routing-settings.component.html',
    styleUrls: ['./smart-routing-settings.component.scss', '../../../../../assets/sass/libs/datatables.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SmartRoutingSettingsComponent implements OnInit, AfterViewInit {
    public rows = [];
    public ColumnMode = ColumnMode;
    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('tablesSM') tablesSM: any;

    constructor(
        private readonly smartRoutingService: SmartRoutingService,
        private changeDetector: ChangeDetectorRef,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {}

    ngAfterViewInit() {
        this.getSMConfig();
    }

    async getSMConfig() {
        try {
            const data = await this.smartRoutingService.getSmartRouting();

            this.rows = data;

            this.changeDetector.detectChanges();
        } catch (e) {
            SweetalertService.errorAlert('', 'Ошибка загрузки данных');
        }
    }

    async addSmartRouting() {
        this.router.navigate(['add'], { relativeTo: this.route });
    }

    async onDelete(row: SmartRoutingConfigData) {
        Swal.fire({
            title: 'Вы уверены?',
            text: `Вы хотите удалить маршрутизацию ${row.name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Да, удалить!',
            cancelButtonText: 'Отмена',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await this.smartRoutingService.deleteSmartRoutingById(row.id);

                    Swal.fire('Удалено!', `Маршрутизации ${row.name} был успешно удален.`, 'success');

                    this.getSMConfig();
                } catch (e) {
                    SweetalertService.errorAlert('', 'Ошибка удаление пользователя');
                }
            }
        });
    }
}
