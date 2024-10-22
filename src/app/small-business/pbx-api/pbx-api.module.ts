import { NgModule } from '@angular/core';
import { PbxApiRoutingModule } from './pbx-api-routing.module';
import { ApiComponent } from './components/api/api.component';
import { PbxApiAddSettingsComponent } from './components/settings/add-settings/pbx-api-add-settings.component';
import { PbxApiTokenComponent } from './components/token/pbx-api-token.component';
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
import { QuillModule } from 'ngx-quill';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PbxApiSettingsComponent } from './components/settings/settings/pbx-api-settings.component';

@NgModule({
    declarations: [PbxApiTokenComponent, PbxApiAddSettingsComponent, ApiComponent, PbxApiSettingsComponent],
    imports: [
        PbxApiRoutingModule,
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
        QuillModule.forRoot(),
        NgxSpinnerModule,
    ],
    exports: [PbxApiTokenComponent, PbxApiAddSettingsComponent, ApiComponent],
})
export class PbxApiModule {}
