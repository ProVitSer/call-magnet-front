import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TgSettingsService } from './service/tg-settings.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { TgConfigData } from './models/tg-settings.model';
import { TG_CONFIG } from './models/test-data';

@Component({
    selector: 'app-tg-settings',
    templateUrl: './tg-settings.component.html',
    styleUrls: ['./tg-settings.component.scss'],
})
export class TgSettingsComponent implements OnInit {
    public tableData = [];
    constructor(
        private readonly tgSettingsService: TgSettingsService,
        private router: Router,
        private route: ActivatedRoute,
        private changeDetector: ChangeDetectorRef,
        private spinner: NgxSpinnerService,
    ) {}

    async ngOnInit(): Promise<void> {
        try {
            const settings = TG_CONFIG;
            for (const config of settings) {
                this.tableData.push({
                    id: config.id,
                    name: config.name,
                    token: config.token,
                    chatId: config.chatId,
                });
            }

            this.changeDetector.detectChanges();
        } catch (e) {
            SweetalertService.errorAlert('Ошибка проверки настроек', e.error?.error?.message || 'Проблемы с получением данных');
        }
    }

    async removeSetting(index: number, item: TgConfigData): Promise<void> {
        this.spinner.show(undefined, {
            type: 'square-jelly-box',
            size: 'small',
            bdColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            fullScreen: false,
        });

        try {
            this.tableData.splice(index, 1);
            this.spinner.hide();
            SweetalertService.autoCloseSuccessAlert('', 'Настройки успешно удалены', 2000);
        } catch (e) {
            SweetalertService.errorAlert('Ошибка подключения', e.error?.error?.message || 'Проблемы с удалением данных');
        }
    }

    async testSend(index: number, item: TgConfigData) {
        SweetalertService.autoCloseSuccessAlert('', 'Проверьте чат, сообщение было отправлено', 2000);
    }
    catch(e) {
        SweetalertService.errorAlert('Ошибка подключения', e.error?.error?.message || ' ');
    }
}
