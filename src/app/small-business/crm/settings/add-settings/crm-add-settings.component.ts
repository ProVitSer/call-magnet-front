import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { WizardComponent } from 'angular-archwizard';

@Component({
    selector: 'app-crm-add-settings',
    templateUrl: './crm-add-settings.component.html',
    styleUrls: ['./crm-add-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrmAddSettingsComponent {}
