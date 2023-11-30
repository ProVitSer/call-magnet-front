import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-notification-right-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.scss']
})
export class NotificationPageComponent implements OnInit, AfterViewInit {
  @ViewChild('targetElement') targetElement: ElementRef;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scrollToElement();
    }, 1000);
  }

  scrollToElement() {
    if (this.targetElement && this.targetElement.nativeElement) {
      this.targetElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }
  }
}