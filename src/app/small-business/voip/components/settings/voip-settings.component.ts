import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { VoipSettingsService } from './service/voip-settings.service';
import { TrunkTableData } from './models/voip-settings.model';
import { VOIP_CONF } from './models/test-data';

@Component({
    selector: 'app-voip-settings',
    templateUrl: './voip-settings.component.html',
    styleUrls: ['./voip-settings.component.scss'],
})
export class VoipSettingsComponent implements OnInit {
    public tableData = [];
    constructor(
        private readonly voipSettingsService: VoipSettingsService,
        private router: Router,
        private route: ActivatedRoute,
        private changeDetector: ChangeDetectorRef,
        private spinner: NgxSpinnerService,
    ) {}
    async ngOnInit(): Promise<void> {
        try {
            const settings = VOIP_CONF;
            for (const config of settings) {
                this.tableData.push({
                    trunkId: config.trunkId,
                    trunkStatus: config.trunkStatus,
                    authId: config.trunkData.authId,
                    authPassword: config.trunkData.authPassword,
                    pbxIp: config.trunkData.pbxIp,
                });
            }
            this.changeDetector.detectChanges();
        } catch (e) {
            SweetalertService.errorAlert('Ошибка проверки настроек', e.error?.error?.message || 'Проблемы с получением данных');
        }
    }

    async removeSetting(index: number, item: TrunkTableData): Promise<void> {
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
            this.router.navigate(['add'], { relativeTo: this.route });
        } catch (e) {
            SweetalertService.errorAlert('Ошибка подключения', e.error?.error?.message || 'Проблемы с удалением данных');
        }
    }

    async updateRegister(index: number, item: TrunkTableData) {
        SweetalertService.autoCloseSuccessAlert('', 'Повторный запрос регистрации отправлен', 15000);

        this.changeDetector.detectChanges();
    }
    catch(e) {
        SweetalertService.errorAlert('Ошибка подключения', e.error?.error?.message || ' ');
    }

    async updateField(item: any, field: string, trunkId: string) {
        const updateData = { [field]: item[field] };

        item[`editing${field.charAt(0).toUpperCase() + field.slice(1)}`] = false;
    }
}
