import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PbxApiSettingsService } from '../service/pbx-api-settings.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { WizardComponent } from 'angular-archwizard';

@Component({
    selector: 'app-pbx-api-add-settings',
    templateUrl: './pbx-api-add-settings.component.html',
    styleUrls: ['./pbx-api-add-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PbxApiAddSettingsComponent {
    public selectedOS: string;
    public addPacConfig = false;
    public pacIp = '';
    public pacPort = '';
    @ViewChild('wizard') wizard: WizardComponent;

    constructor(
        public router: Router,
        private ref: ChangeDetectorRef,
        private readonly pbxApiSettingsService: PbxApiSettingsService,
        private spinner: NgxSpinnerService,
        private route: ActivatedRoute,
    ) {}

    ngAfterViewInit() {
        setTimeout(() => {
            this.ref.detectChanges();
        }, 100);
    }

    addEndCheckConnection() {
        const data = {
            ip: this.pacIp,
            port: Number(this.pacPort),
        };

        this.addPacConfig = true;

        this.showSpinner();

        this.addPacConfig = false;
        this.spinner.hide();
        SweetalertService.autoCloseSuccessAlert(
            '',
            'Настройки успешно добавлены, теперь можно сгенерировать токен и пользоваться API',
            5000,
        );

        setTimeout(() => {
            this.router.navigate(['sm/pbx-api/token']);
        }, 5000);
    }

    downloadInstaller(os: string) {
        this.showSpinner();
        this.hideSpinner();
    }

    private showSpinner() {
        this.spinner.show(undefined, {
            type: 'square-jelly-box',
            size: 'small',
            bdColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            fullScreen: false,
        });
    }

    private hideSpinner() {
        this.spinner.hide();
    }
}
