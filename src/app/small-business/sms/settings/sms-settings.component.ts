import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { SmsSettingsService } from './service/sms-settings.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-sms-settings',
    templateUrl: './sms-settings.component.html',
    styleUrls: ['./sms-settings.component.scss'],
})
export class SmsSettingsComponent implements OnInit {
    tableData = [];
    isPasswordVisible: boolean[] = [];
    constructor(
        private smsSettingsService: SmsSettingsService,
        private router: Router,
        private route: ActivatedRoute,
        private changeDetector: ChangeDetectorRef,
        private spinner: NgxSpinnerService,
    ) {}

    async ngOnInit(): Promise<void> {
        try {
            const settings = await this.smsSettingsService.getSmsConfigs();
            if (!settings) {
                this.router.navigate(['add'], { relativeTo: this.route });
            } else {
                this.tableData.push({
                    login: settings.login,
                    psw: settings.psw,
                    smsText: settings.smsText,
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
            await this.smsSettingsService.deleteSmsConfig();

            this.tableData.splice(index, 1);
            this.spinner.hide();
            SweetalertService.autoCloseSuccessAlert('', 'Настройки успешно удалены', 2000);
            this.router.navigate(['add'], { relativeTo: this.route });
        } catch (e) {
            SweetalertService.errorAlert('Ошибка подключения', e.error?.error?.message || 'Проблемы с удалением данных');
        }
    }

    togglePasswordVisibility(index: number): void {
        this.isPasswordVisible[index] = !this.isPasswordVisible[index];

        if (this.isPasswordVisible[index]) {
            setTimeout(() => {
                this.isPasswordVisible[index] = false;
            }, 3000);
        }
    }
}
