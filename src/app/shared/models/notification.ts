export enum NotificationType {
    alert = 'alert',
    report = 'report',
    custom = 'custom',
}

export enum AvatarType {
    icon = 'icon',
    img = 'img',
    name = 'name',
}

export class NotificationAuthor {
    firstName: string;
    lastName: string;
}


export interface GetClientNotificationsReponse {
    id: string;
    type: NotificationType;
    avatarType: AvatarType;
    icon?: string;
    img?: string;
    smallTitle: string;
    fullTitle: string;
    smallText: string;
    html: string;
    link?: string;
    isRead: boolean;
    author: NotificationAuthor;
    created: string;
}

export interface FormatNavbarNotificationsData {
    id: string;
    content: string;
}

export interface GetNotificationListData {
    offset?: number;
    limit: number;
}


export interface GetNotificationListReponse {
    notifications: GetClientNotificationsReponse[];
    count: number;
}
