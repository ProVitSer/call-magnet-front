export interface LoginModel {
    email: string;
    password: string;
}

export interface Menu {
    name: string;
    path: string;
    icon: string;
    badge: string;
    badgeClass: string;
    externalLink: boolean;
    group: Group;
}

export interface Group {
    lines: Menu[];
}


export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    userRoles: string[];
    menu: Menu[];
}

export interface UserData {
    clientId: string;
    userRoles: string[];
}
