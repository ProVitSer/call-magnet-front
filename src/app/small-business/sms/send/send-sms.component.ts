import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { SmsSettingsService } from '../settings/service/sms-settings.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SendSmsSettingsService } from './services/send-sms.service';

@Component({
    selector: 'app-send-sms',
    templateUrl: './send-sms.component.html',
    styleUrls: ['./send-sms.component.scss'],
})
export class SendSmsComponent implements OnInit {
    public smsForm: FormGroup;
    constructor(
        private smsSettingsService: SmsSettingsService,
        private router: Router,
        private fb: FormBuilder,
        private readonly sendSmsSettingsService: SendSmsSettingsService,
    ) {}

    async ngOnInit(): Promise<void> {
        try {
            this.smsForm = this.fb.group({
                number: ['', [Validators.required, Validators.pattern('^[0-9]{1,11}$')]],
                text: ['', [Validators.required, Validators.maxLength(250)]],
            });

            const settings = await this.smsSettingsService.getSmsConfigs();

            if (!settings) {
                SweetalertService.errorAlert('Ошибка', 'У вас не настроен серсив отправки смс');
                this.router.navigate(['sm/sms/settings/add']);
            }
        } catch (e) {
            SweetalertService.errorAlert('Ошибка проверки настроек', e.error?.error?.message || 'Проблемы с получением данных');
        }
    }

    async sendSms() {
        if (this.smsForm.valid) {
            const formData = this.smsForm.value;

            const data = {
                externalNumber: formData.number,
                smsText: formData.text,
            };

            try {
                await this.sendSmsSettingsService.sendSms(data);
                SweetalertService.autoCloseSuccessAlert('', 'Смс успешно поставлена у очередь на отправку', 3000);
                setTimeout(() => {
                    this.router.navigate(['sm/sms/statistic']);
                }, 3000);
            } catch (e) {
                SweetalertService.errorAlert('Ошибка отправки смс', e.error?.error?.message);
            }
        }
    }

    resetForm() {
        this.smsForm.reset();
    }
}
