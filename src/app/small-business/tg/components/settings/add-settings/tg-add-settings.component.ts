import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { WizardComponent } from 'angular-archwizard';
import { TgSettingsService } from '../service/tg-settings.service';

@Component({
    selector: 'app-tg-add-settings',
    templateUrl: './tg-add-settings.component.html',
    styleUrls: ['./tg-add-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TgAddSettingsComponent {
    public tgName = '';
    public tgToken = '';
    public tgChatId = '';
    @ViewChild('wizard') wizard: WizardComponent;

    constructor(
        public router: Router,
        private ref: ChangeDetectorRef,
        private readonly tgSettingsService: TgSettingsService,
        private spinner: NgxSpinnerService,
        private route: ActivatedRoute,
    ) {}

    ngAfterViewInit() {
        setTimeout(() => {
            this.ref.detectChanges();
        }, 100);
    }

    async addTgConfig() {
        const data = {
            name: this.tgName,
            token: this.tgToken,
            chatId: this.tgChatId,
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
            await this.tgSettingsService.createTgConfig(data);

            this.spinner.hide();

            SweetalertService.autoCloseSuccessAlert('', 'Настройки успешно добавлены', 2000);

            document.body.classList.remove('block-user-interaction');

            setTimeout(() => {
                this.router.navigate(['sm/tg/settings']);
            }, 2000);
        } catch (e) {
            this.spinner.hide();
            SweetalertService.errorAlert('Ошибка подключения', e.error?.error?.message || 'Проблемы с сохранением данных');
        }
    }
}
