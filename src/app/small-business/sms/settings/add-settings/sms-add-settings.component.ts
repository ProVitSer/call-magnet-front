import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { WizardComponent } from 'angular-archwizard';
import { SmsServices } from '../models/sms-settings.model';
import { SmsSettingsService } from '../service/sms-settings.service';

@Component({
    selector: 'app-sms-add-settings',
    templateUrl: './sms-add-settings.component.html',
    styleUrls: ['./sms-add-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmsAddSettingsComponent {
    @ViewChild('wizard') wizard: WizardComponent;
    public SmsServices: SmsServices;
    public smsServiceLogin = '';
    public smsServicePassword = '';
    public smsText = '';
    public selectedService: number | null = null;
    constructor(
        public router: Router,
        private ref: ChangeDetectorRef,
        private smsSettingsService: SmsSettingsService,
        private spinner: NgxSpinnerService,
    ) {}

    ngAfterViewInit() {
        setTimeout(() => {
            this.ref.detectChanges();
        }, 100);
    }

    selectService(serviceId: number) {
        this.selectedService = serviceId;
    }

    async addSmsServviceConfig() {
        const data = {
            login: this.smsServiceLogin,
            psw: this.smsServicePassword,
            smsText: this.smsText,
        };

        this.spinner.show(undefined, {
            type: 'square-jelly-box',
            size: 'small',
            bdColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            fullScreen: false,
        });

        try {
            await this.smsSettingsService.createSmsConfig(data);
            this.spinner.hide();
            SweetalertService.autoCloseSuccessAlert('', 'Настройки успешно добавлены', 5000);

            setTimeout(() => {
                this.router.navigate(['sm/sms/settings']);
            }, 5000);
        } catch (e) {
            this.spinner.hide();
            SweetalertService.errorAlert('Ошибка подключения', e.error?.error || 'Проблемы с сохранением данных');
        }
    }
}
