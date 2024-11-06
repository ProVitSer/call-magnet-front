import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { WizardComponent } from 'angular-archwizard';
import { VoipSettingsService } from '../service/voip-settings.service';
import { ApplicationServiceType } from '../models/voip-settings.model';

@Component({
    selector: 'app-voip-add-settings',
    templateUrl: './voip-add-settings.component.html',
    styleUrls: ['./voip-add-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoipAddSettingsComponent {
    public authId = '';
    public authPassword = '';
    public pbxIp = '';
    public applicationServiceType = ApplicationServiceType.cqa;

    @ViewChild('wizard') wizard: WizardComponent;
    constructor(
        public router: Router,
        private ref: ChangeDetectorRef,
        private readonly voipSettingsService: VoipSettingsService,
        private spinner: NgxSpinnerService,
    ) {}
    ngAfterViewInit() {
        setTimeout(() => {
            this.ref.detectChanges();
        }, 100);
    }

    async addTrunkConfig() {
        const data = {
            authId: this.authId,
            authPassword: this.authPassword,
            pbxIp: this.pbxIp,
            applicationServiceType: this.applicationServiceType,
        };

        this.spinner.show(undefined, {
            type: 'square-jelly-box',
            size: 'small',
            bdColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            fullScreen: false,
        });
        try {
            await this.voipSettingsService.createTrunk(data);

            this.spinner.hide();

            SweetalertService.autoCloseSuccessAlert('', 'Настройки успешно добавлены', 5000);

            setTimeout(() => {
                this.router.navigate(['sm/voip/settings']);
            }, 5000);
        } catch (e) {
            this.spinner.hide();
            SweetalertService.errorAlert('Ошибка подключения', e.error?.error?.message || 'Проблемы с сохранением данных');
        }
    }
}
