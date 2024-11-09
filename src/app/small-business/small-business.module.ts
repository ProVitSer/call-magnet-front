import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartistModule } from 'ng-chartist';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularResizedEventModule } from 'angular-resize-event';
import { MatchHeightModule } from '../shared/directives/match-height.directive';
import { SwiperModule } from 'ngx-swiper-wrapper';

@NgModule({
    imports: [CommonModule, ChartistModule, NgbModule, MatchHeightModule, NgApexchartsModule, AngularResizedEventModule, SwiperModule],
    exports: [],
    declarations: [],
    providers: [],
})
export class SmallBusinessModule {}
