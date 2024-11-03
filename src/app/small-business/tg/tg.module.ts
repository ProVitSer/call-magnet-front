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
import { TgRoutingModule } from './tg-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipeModule } from 'app/shared/pipes/pipe.module';
import { TgMessagesComponent } from './components/messages/tg-messages.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TgUsersComponent } from './components/users/tg-users.component';
import { AddTgUserModalComponent } from './components/users/add-tg-user/add-tg-user-modal.component';
import { TgAddSettingsComponent } from './components/settings/add-settings/tg-add-settings.component';
import { TgSettingsComponent } from './components/settings/tg-settings.component';

@NgModule({
    declarations: [TgMessagesComponent, TgUsersComponent, AddTgUserModalComponent, TgAddSettingsComponent, TgSettingsComponent],
    imports: [
        TgRoutingModule,
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
export class TgModule {}
