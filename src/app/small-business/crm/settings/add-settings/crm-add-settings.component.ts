import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { WizardComponent } from 'angular-archwizard';
import { CrmService } from '../models/crm-settings.model';
import { CrmSettingsService } from '../service/crm-settings.service';

@Component({
    selector: 'app-crm-add-settings',
    templateUrl: './crm-add-settings.component.html',
    styleUrls: ['./crm-add-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrmAddSettingsComponent {
    @ViewChild('wizard') wizard: WizardComponent;
    public crmServices: CrmService;
    public crmAdminId = '';
    public crmDomain = '';
    public crmHash = '';
    public crmUserTaskId = '';
    public crmTaskGroup = '';
    public crmDeadlineMin: string | null = null;
    public crmToken = '';
    public selectedCrmService: number | null = null;

    constructor(
        public router: Router,
        private ref: ChangeDetectorRef,
        private crmSettingsService: CrmSettingsService,
        private spinner: NgxSpinnerService,
    ) {}

    ngAfterViewInit() {
        setTimeout(() => {
            this.ref.detectChanges();
        }, 100);
    }

    selectCrmService(serviceId: number) {
        this.selectedCrmService = serviceId;
    }

    async addCrmServiceConfig() {
        const data = {
            adminId: Number(this.crmAdminId),
            domain: this.crmDomain,
            hash: this.crmHash,
            userTaskId: Number(this.crmUserTaskId),
            taskGroup: Number(this.crmTaskGroup),
            ...(this.crmDeadlineMin ? { deadlineMin: Number(this.crmDeadlineMin) } : {}),
            token: this.crmToken,
        };
        this.spinner.show(undefined, {
            type: 'square-jelly-box',
            size: 'small',
            bdColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            fullScreen: false,
        });
        try {
            await this.crmSettingsService.createCrmConfig(data);
            this.spinner.hide();
            SweetalertService.autoCloseSuccessAlert('', 'Настройки успешно добавлены', 5000);
            setTimeout(() => {
                this.router.navigate(['sm/crm/settings']);
            }, 5000);
        } catch (e) {
            this.spinner.hide();
            SweetalertService.errorAlert('Ошибка подключения', e.error?.error || 'Проблемы с сохранением данных');
        }
    }
}
