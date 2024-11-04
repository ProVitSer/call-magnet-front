import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartistModule } from 'ng-chartist';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularResizedEventModule } from 'angular-resize-event';
import { MatchHeightModule } from 'app/shared/directives/match-height.directive';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CallsAnalyticsComponent } from './components/calls/calls-analytics.component';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { CdrAnalyticsComponent } from './components/cdr/cdr-analytics.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipeModule } from 'app/shared/pipes/pipe.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CallDetailComponent } from './components/call-detail/call-detail.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
    declarations: [CallsAnalyticsComponent, CdrAnalyticsComponent, CallDetailComponent],
    imports: [
        CommonModule,
        AnalyticsRoutingModule,
        ChartistModule,
        NgbModule,
        NgApexchartsModule,
        AngularResizedEventModule,
        MatchHeightModule,
        ChartistModule,
        NgxChartsModule,
        NgApexchartsModule,
        NgxDatatableModule,
        PipeModule,
        NgbDatepickerModule,
        NgbModule,
        NgSelectModule,
        FormsModule,
        NgxSpinnerModule,
    ],
})
export class AnalyticsModule {}
