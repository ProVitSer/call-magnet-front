import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'environments/environment';
import { Observable, throwError } from "rxjs";
import { AvatarType, FormatNavbarNotificationsData, GetClientNotificationsReponse, GetNotificationListData, GetNotificationListReponse, NotificationType } from "../models/notification";
import { HttpResponse } from "../models/response";
import { catchError } from "rxjs/operators";
import * as moment from 'moment';

@Injectable({
providedIn: "root"
})
export class NotificationService {
    private readonly serverUrl = environment.API_GATEWAY_URL;
    constructor( 
      private http: HttpClient,
    ) {}

    public getUserNotifications(limit: string): Observable<HttpResponse<GetClientNotificationsReponse[]>> {
        return this.http
          .get<HttpResponse<GetClientNotificationsReponse[]>>(`${this.serverUrl}notification?limit=${limit}`,)
          .pipe(catchError(this.errorHandler));
    }

    
    public markNotificationsIsRead(notificationId: string): Observable<HttpResponse<object>> {
      return this.http
        .put<HttpResponse<object>>(`${this.serverUrl}notification/mark-read`, {ids: [notificationId] })
        .pipe(catchError(this.errorHandler));
    }

    public deleteNotification(notificationId: string): Observable<HttpResponse<object>> {
      return this.http
        .put<HttpResponse<object>>(`${this.serverUrl}notification/delete`, { notificationId })
        .pipe(catchError(this.errorHandler));
    }

    public getNotificationsList(data: GetNotificationListData): Observable<HttpResponse<GetNotificationListReponse>> {
      return this.http
        .post<HttpResponse<GetNotificationListReponse>>(`${this.serverUrl}notification/list`,data)
        .pipe(catchError(this.errorHandler));
  }

    public formatNavbarNotifications(data: GetClientNotificationsReponse[]): FormatNavbarNotificationsData[] {
      let notifications: FormatNavbarNotificationsData[] = [];
      data.map((n: GetClientNotificationsReponse) => {
        const notificationProv = this.getProvider(n.type);
        notifications.push({
          id: n.id,
          content:notificationProv.formatSmallByType(n)
        });
      })
      return notifications;
    }

    public formatNotificationsForPage(data: GetClientNotificationsReponse[]): FormatNavbarNotificationsData[] {
      let notifications: FormatNavbarNotificationsData[] = [];
      data.map((n: GetClientNotificationsReponse) => {
        const notificationProv = this.getProvider(n.type);
        notifications.push({
          id: n.id,
          content:notificationProv.formatFullByType(n)
        });
      })
      return notifications;
    }


    public getProvider(type: NotificationType): FormatNotifications {
      if (!(type in FORMAT_NAVBAR_NOTI_PROV)) return;
      return FORMAT_NAVBAR_NOTI_PROV[type];
    }

    private errorHandler(e) {
        let errorMessage = '';
        if (e.error && e.error.message) {
          errorMessage = e.error.message;
        } else {
          errorMessage = `Error Code: ${e.status}\nMessage: ${e.message}`;
        }
        return throwError(errorMessage);
      }
}




abstract class FormatNotifications {
  protected abstract formatSmall(data: GetClientNotificationsReponse, baseTag: BaseTag): string;
  protected abstract formatFull(data: GetClientNotificationsReponse, baseTag: BaseTag): string;

  public formatSmallByType(data: GetClientNotificationsReponse){
    const avatar = new BaseTag(data);
    return this.formatSmall(data, avatar);
  }

  public formatFullByType(data: GetClientNotificationsReponse){
    const avatar = new BaseTag(data);
    return this.formatFull(data, avatar);
  }
}

export class BaseTag {
  private avatar: string;
  private time: string;
  private isRead: string;
  constructor(private data: GetClientNotificationsReponse) {
    this.setAvatar();
    this.setNotificationTime();
    this.isRead = (data.isRead) ? 'read-notification' : '';
  }

  get getAvatar(){
    return this.avatar;
  }

  get getNotificationTime(){
    return this.time;
  }

  
  get read(){
    return this.isRead;
  }

  private setNotificationTime(){
    const dateString = this.data.created;
    const targetDate = moment(dateString);
    const currentDate = moment();
    if (targetDate.isSame(currentDate, 'day')) {
      const millisecondsDiff = currentDate.diff(targetDate);
      const hoursDiff = Math.floor(millisecondsDiff / (1000 * 60 * 60));
      let hoursDescription: string = '';

      if(hoursDiff == 0) {
        hoursDescription = `Недавно`
      } else if (hoursDiff == 1){
        hoursDescription = `Час дня назад`
      } else if([2,3,4].includes(hoursDiff)){
        hoursDescription = `${hoursDiff} часа назад`
      } else {
        hoursDescription = `${hoursDiff} часов назад`
      }

      this.time = `${hoursDescription}`;
    } else {
      const daysDiff = currentDate.diff(targetDate, 'days');

      let dayDescription: string = '';

      if([0,1].includes(daysDiff)) {
        dayDescription = `1 день назад`
      } else if ([2,3,4].includes(daysDiff)){
        dayDescription = `${daysDiff} дня назад`
      } else {
        dayDescription = `${daysDiff} дней назад`
      }

      this.time = `${dayDescription}`;
    }
  }

  private setAvatar(){

    switch(this.data.avatarType){
      case AvatarType.icon:
        this.avatar = `<i class="${this.data.icon} text-info"></i>`;
        break;
      case AvatarType.img:
        this.avatar = `<img class="avatar" src="${this.data.img}" alt="avatar" height="45" width="45" />`;
        break;
      case AvatarType.name:
        this.avatar = `<span class="avatar-content font-medium-2">${this.data.author.firstName[0]}${this.data.author.lastName[0]}</span>`;
        break;
      default:
        this.avatar = '';
        break;
    }
  }
}


class FormatAlertNotification extends FormatNotifications{

  public formatSmall(data: GetClientNotificationsReponse, baseTag: BaseTag): string {
    return this._formatSmall(data, baseTag)
  }

  public formatFull(data: GetClientNotificationsReponse, baseTag: BaseTag): string {
    return this._formatFull(data, baseTag)

  }

  public _formatFull(data: GetClientNotificationsReponse, baseTag: BaseTag): string {
    return `<li class="timeline-line"></li>
    <li class="timeline-item">
      <div class="timeline-badge">
        <span class="bg-primary bg-lighten-4">
          <i class="ft-award primary"></i>
        </span>
      </div>
      <div class="timeline-card card shadow-z-1">
        <div class="card-content">
          <div class="card-body">
          <div class="del-notification"></div>
            <h4 class="card-title mb-0">${data.fullTitle}</h4>
            <div class="card-subtitle text-muted mt-0">
              <span class="font-small-3">${baseTag.getNotificationTime}</span>
            </div>
            ${data.html}
          </div>
        </div>
      </div>
    </li>
    `
  }

  private _formatSmall(data: GetClientNotificationsReponse, baseTag: BaseTag): string {
    return `<a class="d-flex justify-content-between ${baseTag.read}">
    <div class="media d-flex align-items-center">
      <div class="media-left">
        <div class="avatar bg-primary bg-lighten-3 mr-3 p-1">
        ${baseTag.getAvatar}
        </div>
      </div>
      <div class="media-body">
      <h6 class="m-0">
      <span>${data.smallTitle}</span><small class="grey lighten-1 font-italic float-right">${baseTag.getNotificationTime}</small>
    </h6>
    <small class="noti-text">Уведомление</small>
    <h6 class="noti-text font-small-3 m-0">
      ${data.smallText}
    </h6>
      </div>
    </div>
  </a>`

  }
}

class FormatReportNotification extends FormatNotifications{
  public formatSmall(data: GetClientNotificationsReponse, baseTag: BaseTag): string {
    return this._formatSmall(data, baseTag)
  }

  public formatFull(data: GetClientNotificationsReponse, baseTag: BaseTag): string {
    return this._formatFull(data, baseTag)

  }

  public _formatFull(data: GetClientNotificationsReponse, baseTag: BaseTag): string {
    throw new Error("Method not implemented.");
  }

  private _formatSmall(data: GetClientNotificationsReponse, baseTag: BaseTag): string {
    return `<div class="d-flex justify-content-between cursor-pointer ${baseTag.read}">
    <div class="media d-flex align-items-center">
      <div class="media-left">
        <div class="avatar bg-info bg-lighten-4 mr-3 p-1">
          <div class="avatar-content font-medium-2">
            ${baseTag.getAvatar}
          </div>
        </div>
      </div>
      <div class="media-body">
        <h6 class="m-0">
        <a href=${data.link} target="_blank">
          <span>${data.smallTitle}</span><small class="grey lighten-1 font-italic float-right">${baseTag.getNotificationTime}</small>
        </h6>
        </a>
      </div>
    </div>
  </div>`
  }
}


class FormatCustomNotification extends FormatNotifications{
  public formatSmall(data: GetClientNotificationsReponse, baseTag: BaseTag): string {
    return this._formatSmall(data, baseTag)
  }

  public formatFull(data: GetClientNotificationsReponse, baseTag: BaseTag): string {
    return this._formatFull(data, baseTag)

  }

  public _formatFull(data: GetClientNotificationsReponse, baseTag: BaseTag): string {
    throw new Error("Method not implemented.");
  }

  private _formatSmall(data: GetClientNotificationsReponse, baseTag: BaseTag): string {
    return `<a class="d-flex justify-content-between ${baseTag.read}">
    <div class="media d-flex align-items-center">
      <div class="media-left">
        <div class="mr-3">
        ${baseTag.getAvatar}
        </div>
      </div>
      <div class="media-body">
        <h6 class="m-0">
          <span>${data.smallTitle}</span><small class="grey lighten-1 font-italic float-right">${baseTag.getNotificationTime}</small>
        </h6>
        <h6 class="noti-text font-small-3 m-0">
        ${data.smallText}
        </h6>
      </div>
    </div>
  </a>`

  }
}

const FORMAT_NAVBAR_NOTI_PROV: {[key in NotificationType]: FormatNotifications} = {
  [NotificationType.alert]: new FormatAlertNotification(),
  [NotificationType.report]: new FormatReportNotification(),
  [NotificationType.custom]: new FormatCustomNotification()
}
