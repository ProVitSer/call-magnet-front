import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartistModule } from 'ng-chartist';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularResizedEventModule } from 'angular-resize-event';
import { DashboardSmallBusinessComponent } from './components/dashboard-small-business.component';
import { DashboardSmallBusinessRoutingModule } from './dashboard-small-business-routing.module';
import { MatchHeightModule } from 'app/shared/directives/match-height.directive';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
    declarations: [DashboardSmallBusinessComponent],
    imports: [
        CommonModule,
        DashboardSmallBusinessRoutingModule,
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
    exports: [DashboardSmallBusinessComponent],
})
export class DashboardSmallBusinessModule {}
