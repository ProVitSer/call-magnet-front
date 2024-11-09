import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatchHeightModule } from 'app/shared/directives/match-height.directive';
import { TagInputModule } from 'ngx-chips';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ngx-custom-validators';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipeModule } from 'app/shared/pipes/pipe.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CqaRoutingModule } from './cqa-routing.module';
import { CqaStatisticComponent } from './statistic/cqa-statistic.component';
import { CqaSettingsComponent } from './settings/cqa-settings.component';

@NgModule({
    declarations: [CqaStatisticComponent, CqaSettingsComponent],
    imports: [
        CqaRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        MatchHeightModule,
        NgbModule,
        NgSelectModule,
        TagInputModule,
        ArchwizardModule,
        CustomFormsModule,
        UiSwitchModule,
        NgxSpinnerModule,
        CommonModule,
        NgxDatatableModule,
        PipeModule,
        NgbDatepickerModule,
    ],
    exports: [],
})
export class CqaModule {}
