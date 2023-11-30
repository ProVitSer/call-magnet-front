import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ChartistModule } from 'ng-chartist';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularResizedEventModule } from 'angular-resize-event';
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import { DashboardSmallBusinessComponent } from './dashboard-small-business/components/dashboard-small-business.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { FaqComponent } from './faq/components/faq.component';


@NgModule({
    imports: [
        CommonModule,
        ChartistModule,
        NgbModule,
        MatchHeightModule,
        NgApexchartsModule,
        AngularResizedEventModule,
        SwiperModule
    ],
    exports: [],
    declarations: [
        DashboardSmallBusinessComponent,
        FaqComponent
    ],
    providers: [FaqComponent],
})
export class SmallBusinessModule { }
