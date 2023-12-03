import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormatNavbarNotificationsData, GetClientNotificationsReponse, GetNotificationListReponse } from 'app/shared/models/notification';
import { HttpResponse } from 'app/shared/models/response';
import { NotificationService } from 'app/shared/services/notification.service';
import { SweetalertService } from 'app/shared/services/sweetalert.service';

@Component({
  selector: 'app-notification-right-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.scss']
})
export class NotificationPageComponent implements OnInit, AfterViewInit {
  @ViewChild('targetElement') targetElement: ElementRef;
  notificationExist: boolean = false;
  private notificationInitLimit: number = 1;
  private notificationNextLimit: number = 1;
  private notificationsMap: string[] = [];
  private countNotification: number;
  moreNotifications: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private el: ElementRef,
    private notificationService: NotificationService) {
    
  }

  ngOnInit(): void {
    this.getUserNotifications();
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

  private getUserNotifications(){
    const notifications = this.notificationService.getNotificationsList({ limit: this.notificationInitLimit }).subscribe(
      (res: HttpResponse<GetNotificationListReponse>) => {
        const result = res;
        if (result.result && res.hasOwnProperty('data')) {
          if(result.data.notifications.length != 0){
            this.notificationExist = true;
            this.countNotification = result.data.notifications.length;
            this.moreNotifications = (result.data.count > this.notificationInitLimit);
            this.setNotifications(result.data.notifications);
            this.cdr.markForCheck();
          }
        }
      },
      (e) => {
        SweetalertService.errorAlert('Ошибка получения уведомлений', 'Что-то пошло не так, просьба обратиться в техническую поддержку')
    })
  }

  private setNotifications(data: GetClientNotificationsReponse[]){
    const notifications = this.notificationService.formatNotificationsForPage(data);
    const scrollableContainer = this.el.nativeElement.querySelector('.notifications-timeline');

    notifications.forEach(item => {
      this.notificationsMap.push(item.id);

      const newDiv = this.renderer.createElement('div');
      this.renderer.setAttribute(newDiv, 'notificationId', item.id);
      this.renderer.setProperty(newDiv, 'innerHTML', item.content);
      this.renderer.appendChild(scrollableContainer, newDiv);

      this.addDelIcon(item);

    });

  }

  private moreNotification(){
    const notifications = this.notificationService.getNotificationsList({ limit: this.notificationNextLimit, offset: this.countNotification }).subscribe(
      (res: HttpResponse<GetNotificationListReponse>) => {
        const result = res;
        if (result.result && res.hasOwnProperty('data')) {
          if(result.data.notifications.length != 0){
            this.countNotification = this.countNotification + result.data.notifications.length;
            this.setNotifications(result.data.notifications);
            this.moreNotifications = !(this.countNotification == res.data.count);
          } else {
            this.moreNotifications = false;
          }
          this.cdr.markForCheck();
        }
      },
      (e) => {
        SweetalertService.errorAlert('Ошибка получения уведомлений', 'Что-то пошло не так, просьба обратиться в техническую поддержку')
    })
  }

  private addDelIcon(item: FormatNavbarNotificationsData){

    const divElement = this.el.nativeElement.querySelector(`[notificationId="${item.id}"]`);
    const mediaElement = divElement.querySelector('.del-notification');

    const span = this.renderer.createElement('span');
    this.renderer.addClass(span, 'float-right');
    this.renderer.addClass(span, 'cursor-pointer');

    const icon = this.renderer.createElement('i');
    this.renderer.addClass(icon, 'ft-trash-2');
    this.renderer.addClass(icon, 'text-danger');

    this.renderer.appendChild(span, icon);

    this.renderer.listen(span, 'click', () => this.handleDelete(item.id));

    this.renderer.appendChild(mediaElement, span);
  }

  handleDelete(notificationId: string){
        this.notificationService.deleteNotification(notificationId).subscribe();

        const divElement = this.el.nativeElement.querySelector(`[notificationId="${notificationId}"]`);

        if (divElement) {
          this.renderer.removeChild(divElement.parentNode, divElement);
        }

        this.checkNotification(notificationId)
        this.cdr.markForCheck();
  }

  private checkNotification(notificationId: string){
    this.notificationsMap = this.notificationsMap.filter((id: string) => id != notificationId);
    if(this.notificationsMap.length == 0){
      this.notificationExist = false;
    }
  }
}