import { NgModule } from '@angular/core';
import { FaqRoutingModule } from './faq-routing.module';
import { FaqComponent } from './components/faq.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [FaqComponent],
    imports: [SwiperModule, NgbModule, FaqRoutingModule],
    exports: [FaqComponent],
})
export class FaqModule {}
