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
    public tableData = [];
    public isHashVisible: boolean[] = [];
    constructor(
        private crmSettingsService: CrmSettingsService,
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

    toggleHashVisibility(index: number): void {}

    async updateField(item: any, field: string) {}
}
