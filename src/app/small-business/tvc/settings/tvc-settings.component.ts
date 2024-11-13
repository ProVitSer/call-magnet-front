import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { TVC_CONF } from './test-data';

@Component({
    selector: 'app-tvc-settings',
    templateUrl: './tvc-settings.component.html',
    styleUrls: ['./tvc-settings.component.scss'],
})
export class TvcSettingsComponent implements OnInit {
    public tableData = [];
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private changeDetector: ChangeDetectorRef,
        private spinner: NgxSpinnerService,
    ) {}
    async ngOnInit(): Promise<void> {
        try {
            const settings = TVC_CONF;
            for (const config of settings) {
                this.tableData.push({
                    pgHost: config.pgHost,
                    pgPort: config.pgPort,
                    pgDb: config.pgDb,
                    pgUsername: config.pgUsername,
                    pgPassword: config.pgPassword,
                    amiHost: config.amiHost,
                    amiPort: config.amiPort,
                    amiUsername: config.amiUsername,
                    amiPassword: config.amiPassword,
                    message: config.message,
                });
            }
            this.changeDetector.detectChanges();
        } catch (e) {
            SweetalertService.errorAlert('Ошибка проверки настроек', e.error?.error?.message || 'Проблемы с получением данных');
        }
    }

    async updateField(item: any, field: string, trunkId: string) {
        const updateData = { [field]: item[field] };

        item[`editing${field.charAt(0).toUpperCase() + field.slice(1)}`] = false;
    }
}
