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
import { VoipRoutingModule } from './voip-routing.module';
import { VoipAddSettingsComponent } from './components/settings/add-settings/voip-add-settings.component';
import { VoipSettingsComponent } from './components/settings/voip-settings.component';

@NgModule({
    declarations: [VoipAddSettingsComponent, VoipSettingsComponent],
    imports: [
        VoipRoutingModule,
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
export class VoipModule {}
