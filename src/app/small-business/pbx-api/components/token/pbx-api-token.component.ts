import { ChangeDetectorRef, Component } from '@angular/core';
import { PbxApiSettingsService } from '../settings/service/pbx-api-settings.service';
import { Router } from '@angular/router';
import { SweetalertService } from 'app/shared/services/sweetalert.service';

@Component({
    selector: 'app-pbx-api-token',
    templateUrl: './pbx-api-token.component.html',
    styleUrls: ['./pbx-api-token.component.scss'],
})
export class PbxApiTokenComponent {
    public apiToken = '';
    constructor(
        public router: Router,
        private readonly pbxApiSettingsService: PbxApiSettingsService,
        private changeDetector: ChangeDetectorRef,
    ) {}

    async getApiToken(): Promise<void> {
        try {
            this.apiToken =
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTczMTUyNjE4NiwiZXhwIjoxNzYzMDYyMTg2fQ.UrDDXRBaLfo03zP3a_M9FcP4uk-QSKb0YsBxelpcTgo';

            this.changeDetector.detectChanges();
        } catch (e) {
            if (e.status == 403) {
                SweetalertService.errorAlert('', 'У вас нет прав на данное действие');
            } else {
                SweetalertService.errorAlert('', e.error?.error?.message || 'Ошибка получения данных');
            }
        }
    }

    copyToClipboard(): void {
        navigator.clipboard.writeText(this.apiToken).then();
    }
}
