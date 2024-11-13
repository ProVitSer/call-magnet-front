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
    public tableData = [];
    public isPasswordVisible: boolean[] = [];
    constructor(
        private smsSettingsService: SmsSettingsService,
        private router: Router,
        private route: ActivatedRoute,
        private changeDetector: ChangeDetectorRef,
        private spinner: NgxSpinnerService,
    ) {}

    async ngOnInit(): Promise<void> {
        try {
            this.router.navigate(['add'], { relativeTo: this.route });
        } catch (e) {
            SweetalertService.errorAlert('Ошибка проверки настроек', e.error?.error?.message || 'Проблемы с получением данных');
        }
    }

    async removeSetting(index: number): Promise<void> {}

    togglePasswordVisibility(index: number): void {
        this.isPasswordVisible[index] = !this.isPasswordVisible[index];

        if (this.isPasswordVisible[index]) {
            setTimeout(() => {
                this.isPasswordVisible[index] = false;
            }, 3000);
        }
    }
}
