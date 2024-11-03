import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartistModule } from 'ng-chartist';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularResizedEventModule } from 'angular-resize-event';
import { MatchHeightModule } from 'app/shared/directives/match-height.directive';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CallAnalyticsComponent } from './components/call/call-analytics.component';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { CdrAnalyticsComponent } from './components/cdr/cdr-analytics.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipeModule } from 'app/shared/pipes/pipe.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [CallAnalyticsComponent, CdrAnalyticsComponent],
    imports: [
        CommonModule,
        AnalyticsRoutingModule,
        ChartistModule,
        NgbModule,
        NgApexchartsModule,
        AngularResizedEventModule,
        MatchHeightModule,
        ChartsModule,
        ChartistModule,
        NgxChartsModule,
        NgApexchartsModule,
        NgxDatatableModule,
        PipeModule,
        NgbDatepickerModule,
        NgbModule,
        NgSelectModule,
        FormsModule,
    ],
    exports: [CallAnalyticsComponent],
})
export class AnalyticsModule {}
