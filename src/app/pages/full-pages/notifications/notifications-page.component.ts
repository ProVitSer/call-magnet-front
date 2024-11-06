import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatNavbarNotificationsData, GetClientNotificationsReponse, GetNotificationListReponse } from 'app/shared/models/notification';
import { NotificationService } from 'app/shared/services/notification.service';
import { SweetalertService } from 'app/shared/services/sweetalert.service';

@Component({
    selector: 'app-notifications-right-page',
    templateUrl: './notifications-page.component.html',
    styleUrls: ['./notifications-page.component.scss'],
})
export class NotificationsPageComponent implements OnInit, AfterViewInit {
    notificationExist = false;
    private notificationInitLimit = 7;
    private notificationNextLimit = 7;
    private notificationsMap: string[] = [];
    private countNotification: number;
    moreNotifications = false;
    notificationTargetElement: string;

    constructor(
        private cdr: ChangeDetectorRef,
        private renderer: Renderer2,
        private el: ElementRef,
        private notificationService: NotificationService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.route.fragment.subscribe((fragment: string) => {
            if (fragment) {
                this.notificationTargetElement = fragment;
            }
        });
    }

    ngAfterViewInit(): void {
        this.getUserNotifications();
    }

    scrollToElement() {
        if (this.notificationTargetElement) {
            const divElement = this.el.nativeElement.querySelector(`[notificationId="${this.notificationTargetElement}"]`);
            if (divElement) {
                divElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
            }
        }
    }

    private getUserNotifications() {
        this.notificationService.getNotificationsList({ limit: this.notificationInitLimit }).subscribe(
            (res: GetNotificationListReponse) => {
                const result = res;
                if (res) {
                    if (res.notifications.length != 0) {
                        this.notificationExist = true;
                        this.countNotification = result.notifications.length;
                        this.moreNotifications = result.count > this.notificationInitLimit;
                        this.setNotifications(result.notifications);
                        this.cdr.markForCheck();
                    }
                }
            },
            (e) => {
                SweetalertService.errorAlert(
                    'Ошибка получения уведомлений',
                    'Что-то пошло не так, просьба обратиться в техническую поддержку',
                );
            },
        );
    }

    private setNotifications(data: GetClientNotificationsReponse[]) {
        const notifications = this.notificationService.formatNotificationsForPage(data);
        const scrollableContainer = this.el.nativeElement.querySelector('.notifications-timeline');

        notifications.forEach((item) => {
            this.notificationsMap.push(item.id);

            const newDiv = this.renderer.createElement('div');

            this.renderer.setAttribute(newDiv, 'notificationId', item.id);

            this.renderer.setProperty(newDiv, 'innerHTML', item.content);

            this.renderer.appendChild(scrollableContainer, newDiv);

            this.addDelIcon(item);
        });
        this.scrollToElement();
    }

    public moreNotification() {
        this.notificationService.getNotificationsList({ limit: this.notificationNextLimit, offset: this.countNotification }).subscribe(
            (res: GetNotificationListReponse) => {
                const result = res;
                if (res) {
                    if (res.notifications.length != 0) {
                        this.countNotification = this.countNotification + result.notifications.length;
                        this.setNotifications(result.notifications);
                        this.moreNotifications = !(this.countNotification == res.count);
                    } else {
                        this.moreNotifications = false;
                    }
                    this.cdr.markForCheck();
                }
            },
            (e) => {
                SweetalertService.errorAlert(
                    'Ошибка получения уведомлений',
                    'Что-то пошло не так, просьба обратиться в техническую поддержку',
                );
            },
        );
    }

    private addDelIcon(item: FormatNavbarNotificationsData) {
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

    handleDelete(notificationId: string) {
        this.notificationService.deleteNotification(notificationId).subscribe();

        const divElement = this.el.nativeElement.querySelector(`[notificationId="${notificationId}"]`);

        if (divElement) {
            this.renderer.removeChild(divElement.parentNode, divElement);
        }

        this.checkNotification(notificationId);
        this.cdr.markForCheck();
    }

    private checkNotification(notificationId: string) {
        this.notificationsMap = this.notificationsMap.filter((id: string) => id != notificationId);
        if (this.notificationsMap.length == 0) {
            this.notificationExist = false;
        }
    }
}
