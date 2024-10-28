import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, OnInit } from '@angular/core';
import { WizardComponent } from 'angular-archwizard';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MissedCallService } from '../services/missed-call.service';
import { MissedServiceType } from '../models/missed-call.model';

@Component({
    selector: 'app-add-missed-call-settings',
    templateUrl: './add-missed-call-settings.component.html',
    styleUrls: ['./add-missed-call-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMissedCallSettingsComponent implements OnInit {
    @ViewChild('wizard') wizard: WizardComponent;
    trunksName = [];
    selectedMCService: string[] = [];
    selectedTrunkName: string;
    defaultRoutingNumber: string;

    selectedService: string | null = null;
    constructor(
        private ref: ChangeDetectorRef,
        private spinner: NgxSpinnerService,
        public router: Router,
        private readonly missedCallService: MissedCallService,
    ) {}

    ngOnInit(): void {
        this.getExistsTrunk();
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.ref.detectChanges();
        }, 100);
    }

    async getExistsTrunk() {
        const data = await this.missedCallService.getTrunkName();

        this.trunksName = data;
    }

    async addMCConfig() {
        const data = {
            trunkName: this.selectedTrunkName,
            missedServiceType: this.selectedMCService as MissedServiceType[],
        };

        this.spinner.show(undefined, {
            type: 'square-jelly-box',
            size: 'small',
            bdColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            fullScreen: false,
        });

        try {
            await this.missedCallService.addMissedCallConfig(data);

            this.spinner.hide();

            SweetalertService.autoCloseSuccessAlert('', 'Настройки успешно добавлены', 2000);

            setTimeout(() => {
                this.router.navigate(['sm/missed-call']);
            }, 5000);
        } catch (e) {
            this.spinner.hide();
            SweetalertService.errorAlert('Ошибка подключения', e.error?.error.message || 'Проблемы с сохранением данных');
        }
    }

    toggleService(service: string): void {
        const index = this.selectedMCService.indexOf(service as MissedServiceType);
        if (index === -1) {
            this.selectedMCService.push(service as MissedServiceType);
        } else {
            this.selectedMCService.splice(index, 1);
        }
    }
}
