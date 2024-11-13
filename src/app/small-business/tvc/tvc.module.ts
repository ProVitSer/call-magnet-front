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
import { TvcRoutingModule } from './tvc-routing.module';
import { TvcPhonebookComponent } from './phonebook/tvc-phonebook.component';
import { AddTvcPhonebookModalComponent } from './phonebook/add-tvc-phonebook/add-tvc-phonebook-modal.component';
import { TvcMessagesComponent } from './messages/tvc-messages.component';
import { TvcSettingsComponent } from './settings/tvc-settings.component';

@NgModule({
    declarations: [TvcPhonebookComponent, AddTvcPhonebookModalComponent, TvcMessagesComponent, TvcSettingsComponent],
    imports: [
        TvcRoutingModule,
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
        NgxDatatableModule,
        PipeModule,
        NgbDatepickerModule,
    ],
    exports: [],
})
export class TvcModule {}
