import { Component, Output, EventEmitter, OnDestroy, OnInit, AfterViewInit, ChangeDetectorRef, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { LayoutService } from '../services/layout.service';
import { Subject, Subscription, fromEvent } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { NotificationService } from '../services/notification.service';
import { HttpResponse } from '../models/response';
import { GetClientNotificationsReponse } from '../models/notification';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  placement = "bottom-right";
  logoUrl = 'assets/img/logo.png';
  menuPosition = 'Side';
  isSmallScreen = false;
  protected innerWidth: any;
  transparentBGClass = "";
  hideSidebar: boolean = true;
  public isCollapsed = true;
  layoutSub: Subscription;
  configSub: Subscription;
  toggleClass = "ft-maximize";
  fio: string = '';
  company: string = '';
  numberOfNewNotifications: number = 0;
  notificationsIds: string[];

  @Output()
  toggleHideSidebar = new EventEmitter<Object>();

  @Output()
  seachTextEmpty = new EventEmitter<boolean>();
  control = new UntypedFormControl();

  public config: any = {};
  private destroy$ = new Subject<void>();
  private subscriptionsMap: { [key: string]: Subscription } = {};

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private renderer: Renderer2,
    private configService: ConfigService, 
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private notificationService: NotificationService
    ) {

    this.config = this.configService.templateConf;
    this.innerWidth = window.innerWidth;

    this.layoutSub = layoutService.toggleSidebar$.subscribe(
      isShow => {
        this.hideSidebar = !isShow;
      });

  }

  ngOnInit() {

    if (this.innerWidth < 1200) {
      this.isSmallScreen = true;
    }
    else {
      this.isSmallScreen = false;
    }

    this.setUserInfo();
    this.getUserNotifications();

  }


  ngAfterViewInit() {
    this.configSub = this.configService.templateConf$.subscribe((templateConf) => {
      if (templateConf) {
        this.config = templateConf;
      }
      this.loadLayout();
      this.cdr.markForCheck();

    })
  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
    if (this.configSub) {
      this.configSub.unsubscribe();
    }

    Object.values(this.subscriptionsMap).forEach(subscription => subscription.unsubscribe());


    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = event.target.innerWidth;
    if (this.innerWidth < 1200) {
      this.isSmallScreen = true;
    }
    else {
      this.isSmallScreen = false;
    }
  }

  logout() {
    this.authService.logout();
  }


  loadLayout() {

    if (this.config.layout.menuPosition && this.config.layout.menuPosition.toString().trim() != "") {
      this.menuPosition = this.config.layout.menuPosition;
    }

    if (this.config.layout.variant === "Light") {
      this.logoUrl = 'assets/img/logo-dark.png';
    }
    else {
      this.logoUrl = 'assets/img/logo.png';
    }

    if (this.config.layout.variant === "Transparent") {
      this.transparentBGClass = this.config.layout.sidebar.backgroundColor;
    }
    else {
      this.transparentBGClass = "";
    }

  }

  toggleNotificationSidebar() {
    this.layoutService.toggleNotificationSidebar(true);
  }

  toggleSidebar() {
    this.layoutService.toggleSidebarSmallScreen(this.hideSidebar);
  }

  ToggleClass() {
    if (this.toggleClass === "ft-maximize") {
      this.toggleClass = "ft-minimize";
    } else {
      this.toggleClass = "ft-maximize";
    }
  }

  private setUserInfo(){
    const client = this.authService.getUser();
    this.fio = `${client.firstname} ${client.lastname}`;
    this.company = client.company;
  }


  private getUserNotifications(){
    const notifications = this.notificationService.getUserNotifications('7').subscribe(
      (res: HttpResponse<GetClientNotificationsReponse[]>) => {
        const result = res;
        if (result.result && res.hasOwnProperty('data')) {
          this.setNotificationsIds(result.data);
          this.setCountNotification(result.data);
          this.setNotifications(result.data)
          this.cdr.markForCheck();
        }
      },
      (e) => {
    })
  }

  private setCountNotification(data: GetClientNotificationsReponse[]){
    this.numberOfNewNotifications = data.filter((n: GetClientNotificationsReponse) => !n.isRead).length; 
  }

  private setNotificationsIds(data: GetClientNotificationsReponse[]){
    this.notificationsIds = data.map((n: GetClientNotificationsReponse) => n.id);
  }

  private setNotifications(data: GetClientNotificationsReponse[]){
    const notifications = this.notificationService.formatNavbarNotifications(data);
    const scrollableContainer = this.el.nativeElement.querySelector('.scrollable-container');

    notifications.forEach(item => {
      const newDiv = this.renderer.createElement('div');
      this.renderer.setAttribute(newDiv, 'notificationId', item.id);
      this.renderer.setProperty(newDiv, 'innerHTML', item.content);
      this.renderer.appendChild(scrollableContainer, newDiv);

      const mouseenter = fromEvent(newDiv, 'mouseenter')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.handleNotificationEnter(item.id));

      const click = fromEvent(newDiv, 'click')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.onNotificationClick(item.id));

    this.subscriptionsMap[item.id] = mouseenter;

    });
  }

  onNotificationClick(id: string){
    const navigationExtras = {
      fragment: id.toString(),
    };

    this.router.navigate(['/notifications'], navigationExtras);
  }

  toNotifications(){
    this.router.navigate(['/notifications']);
  }

  handleNotificationEnter(id: string) {
    this.numberOfNewNotifications = (this.numberOfNewNotifications != 0) ? this.numberOfNewNotifications - 1 : this.numberOfNewNotifications;

    const divElement = this.el.nativeElement.querySelector(`[notificationId="${id}"]`);
    if (divElement && this.subscriptionsMap[id]) {
      this.subscriptionsMap[id].unsubscribe();
    };

    const mediaElement = divElement.querySelector('.media.d-flex.align-items-center');
    if (mediaElement) {
      mediaElement.classList.add('read-notification');
    };

    this.notificationService.markNotificationsIsRead(id).subscribe();
    this.cdr.markForCheck();
  }

  readAllNotification(){
    if(this.notificationsIds.length != 0){
      this.notificationsIds.map((id: string) => {
        this.handleNotificationEnter(id);
      })
    }
  }

}
