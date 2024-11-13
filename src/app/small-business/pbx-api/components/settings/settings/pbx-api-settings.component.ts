import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PbxApiSettingsService } from '../service/pbx-api-settings.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { CONNECTOR } from '../models/test-data';

@Component({
    selector: 'app-pbx-api-settings',
    templateUrl: './pbx-api-settings.component.html',
    styleUrls: ['./pbx-api-settings.component.scss'],
})
export class PbxApiSettingsComponent implements OnInit {
    public tableData = [];
    constructor(
        private pbxApiSettingsService: PbxApiSettingsService,
        private router: Router,
        private route: ActivatedRoute,
        private changeDetector: ChangeDetectorRef,
        private spinner: NgxSpinnerService,
    ) {}

    ngOnInit(): void {
        const settings = CONNECTOR;
        this.tableData.push({
            ip: settings.ip,
            port: settings.port,
            status: 'online',
        });
        this.changeDetector.detectChanges();
    }

    removeSetting(index: number): void {
        this.spinner.show(undefined, {
            type: 'square-jelly-box',
            size: 'small',
            bdColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            fullScreen: false,
        });
        this.spinner.hide();
    }
}
