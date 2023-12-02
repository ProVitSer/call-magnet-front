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
    title: string;
    smalText: string;
    html: string;
    link?: string;
    isRead: boolean;
    author: NotificationAuthor;
    createdAt: string;
}




