import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartistModule } from 'ng-chartist';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularResizedEventModule } from 'angular-resize-event';
import { MatchHeightModule } from 'app/shared/directives/match-height.directive';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CallAnalyticsComponent } from './components/call/call-analytics.component';
import { AnalyticsRoutingModule } from './analytics-routing.module';

@NgModule({
    declarations: [CallAnalyticsComponent],
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
    ],
    exports: [CallAnalyticsComponent],
})
export class AnalyticsModule {}
