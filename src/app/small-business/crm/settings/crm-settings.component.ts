import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CrmSettingsService } from './service/crm-settings.service';

@Component({
    selector: 'app-crm-settings',
    templateUrl: './crm-settings.component.html',
    styleUrls: ['./crm-settings.component.scss'],
})
export class CrmSettingsComponent implements OnInit {
    tableData = [];
    isHashVisible: boolean[] = [];
    constructor(
        private crmSettingsService: CrmSettingsService,
        private router: Router,
        private route: ActivatedRoute,
        private changeDetector: ChangeDetectorRef,
        private spinner: NgxSpinnerService,
    ) {}

    async ngOnInit(): Promise<void> {
        try {
            const settings = await this.crmSettingsService.getCrmConfig();
            if (!settings) {
                this.router.navigate(['add'], { relativeTo: this.route });
            } else {
                this.tableData.push({
                    domain: settings.domain,
                    hash: settings.hash,
                    adminId: settings.adminId,
                    deadlineMin: settings.deadlineMin,
                    userTaskId: settings.userTaskId,
                    taskGroup: settings.taskGroup,
                    token: settings.token,
                });

                this.changeDetector.detectChanges();
            }
        } catch (e) {
            SweetalertService.errorAlert('Ошибка проверки настроек', e.error?.error?.message || 'Проблемы с получением данных');
        }
    }

    async removeSetting(index: number): Promise<void> {
        this.spinner.show(undefined, {
            type: 'square-jelly-box',
            size: 'small',
            bdColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            fullScreen: false,
        });

        try {
            await this.crmSettingsService.deleteCrmConfig();

            this.tableData.splice(index, 1);
            this.spinner.hide();
            SweetalertService.autoCloseSuccessAlert('', 'Настройки успешно удалены', 2000);
            this.router.navigate(['add'], { relativeTo: this.route });
        } catch (e) {
            SweetalertService.errorAlert('Ошибка подключения', e.error?.error?.message || 'Проблемы с удалением данных');
        }
    }

    toggleHashVisibility(index: number): void {
        this.isHashVisible[index] = !this.isHashVisible[index];

        if (this.isHashVisible[index]) {
            setTimeout(() => {
                this.isHashVisible[index] = false;
            }, 3000);
        }
    }

    async updateField(item: any, field: string) {
        const data = { [field]: item[field] };

        if (data['adminId'] || data['userTaskId'] || data['taskGroup'] || data['deadlineMin']) {
            const updateData = { [field]: Number(item[field]) };

            await this.crmSettingsService.updateCrmConfig({ ...updateData });
        } else {
            await this.crmSettingsService.updateCrmConfig({ ...data });
        }

        item[`editing${field.charAt(0).toUpperCase() + field.slice(1)}`] = false;
    }
}
