import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, OnInit } from '@angular/core';
import { WizardComponent } from 'angular-archwizard';
import { SmartRoutingService } from '../services/smart-routing.service';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { RoutingServiceType } from '../models/smart-routing.model';

@Component({
    selector: 'app-add-smart-routing-settings',
    templateUrl: './add-smart-routing-settings.component.html',
    styleUrls: ['./add-smart-routing-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddSmartRoutingSettingsComponent implements OnInit {
    @ViewChild('wizard') wizard: WizardComponent;
    public pbxExtensions = [];
    public smName = '';
    public aiRouting = false;
    public selectedPbxExtension: string;
    public defaultRoutingNumber: string;
    public selectedService: string | null = null;
    constructor(
        private ref: ChangeDetectorRef,
        private readonly smartRoutingService: SmartRoutingService,
        private spinner: NgxSpinnerService,
        public router: Router,
    ) {}

    ngOnInit(): void {
        this.getSMExistsData();
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.ref.detectChanges();
        }, 100);
    }

    async getSMExistsData() {
        const data = await this.smartRoutingService.getPbxExtension();

        this.pbxExtensions = data.map((p) => `${p.number} | ${p.name}`);
    }

    async addSmartRoutingConfig() {
        const data = {
            name: this.smName,
            pbxExtension: this.selectedPbxExtension.split('|')[0].trim(),
            routingService: this.selectedService as RoutingServiceType,
            aiRouting: this.aiRouting,
            defaultRoutingNumber: this.defaultRoutingNumber || '',
        };

        this.spinner.show(undefined, {
            type: 'square-jelly-box',
            size: 'small',
            bdColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            fullScreen: false,
        });

        document.body.classList.add('block-user-interaction');

        try {
            await this.smartRoutingService.addSmartRouting(data);

            this.spinner.hide();

            SweetalertService.autoCloseSuccessAlert('', 'Настройки успешно добавлены', 2000);

            document.body.classList.remove('block-user-interaction');

            setTimeout(() => {
                this.router.navigate(['sm/smart-routing']);
            }, 2000);
        } catch (e) {
            this.spinner.hide();
            SweetalertService.errorAlert('Ошибка подключения', e.error?.error.message || 'Проблемы с сохранением данных');
        }
    }

    selectService(serviceId: string) {
        this.selectedService = serviceId;
    }
}
