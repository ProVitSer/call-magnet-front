import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { FullPagesRoutingModule } from "./full-pages-routing.module";
import { ChartistModule } from "ng-chartist";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { SwiperModule } from "ngx-swiper-wrapper";
import { PipeModule } from "app/shared/pipes/pipe.module";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

@NgModule({
  imports: [
    CommonModule,
    FullPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChartistModule,
    NgSelectModule,
    NgbModule,
    SwiperModule,
    PipeModule,
    NgxDatatableModule,
  ],
  declarations: [
    
  ],
})
export class FullPagesModule {}
