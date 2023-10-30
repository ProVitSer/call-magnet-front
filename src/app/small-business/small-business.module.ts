import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ChartistModule } from 'ng-chartist';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularResizedEventModule } from 'angular-resize-event';
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import { SmallBusinessRoutingModule } from './small-business-routing.module';
import { DashboardSmallBusinessComponent } from './dashboard-small-business/dashboard-small-business.component';


@NgModule({
    imports: [
        CommonModule,
        ChartistModule,
        NgbModule,
        MatchHeightModule,
        NgApexchartsModule,
        AngularResizedEventModule,
        SmallBusinessRoutingModule
    ],
    exports: [],
    declarations: [
        DashboardSmallBusinessComponent
    ],
    providers: [],
})
export class SmallBusinessModule { }
