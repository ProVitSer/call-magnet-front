import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PbxApiSettingsService } from '../service/pbx-api-settings.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SweetalertService } from 'app/shared/services/sweetalert.service';

@Component({
    selector: 'app-pbx-api-settings',
    templateUrl: './pbx-api-settings.component.html',
    styleUrls: ['./pbx-api-settings.component.scss'],
})
export class PbxApiSettingsComponent implements OnInit {
    public tableData = [];
    constructor(
        private pbxApiSettingsService: PbxApiSettingsService,
        private router: Router,
        private route: ActivatedRoute,
        private changeDetector: ChangeDetectorRef,
        private spinner: NgxSpinnerService,
    ) {}

    ngOnInit(): void {
        this.pbxApiSettingsService.getPacConfig().subscribe(
            async (settings) => {
                if (settings == null) {
                    this.router.navigate(['add'], { relativeTo: this.route });
                } else {
                    const checkStatus = await this.pbxApiSettingsService.checkConnection();

                    this.tableData.push({
                        ip: settings.ip,
                        port: settings.port,
                        status: checkStatus.online ? 'online' : 'offline',
                    });
                    this.changeDetector.detectChanges();
                }
            },
            (e) => {
                SweetalertService.errorAlert('Ошибка проверки настроек', e.error?.error?.message || 'Проблемы с получением данных');
            },
        );
    }

    removeSetting(index: number): void {
        this.spinner.show(undefined, {
            type: 'square-jelly-box',
            size: 'small',
            bdColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            fullScreen: false,
        });

        this.pbxApiSettingsService.deletePacConnector().subscribe(
            () => {
                this.tableData.splice(index, 1);
                this.spinner.hide();
                SweetalertService.autoCloseSuccessAlert('', 'Настройки успешно удалены', 2000);
                this.router.navigate(['add'], { relativeTo: this.route });
            },
            (e) => {
                SweetalertService.errorAlert('Ошибка подключения', e.error?.error?.message || 'Проблемы с удалением данных');
            },
        );
    }
}
