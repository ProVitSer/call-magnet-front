export enum Roles {
    api = 'api',
    analitic = 'analitic',
    crm = 'crm',
    autoDial = 'auto-dial',
    sms = 'sms',
    telegram = 'telegram',
    kpi = 'kpi',
}

export interface UserData {
    clientId: string;
    firstname: string;
    lastname: string;
    company: string;
}


export interface UserRoles {
    userRoles: Roles[];
}

export const USER_ROLES_DESCRIPTION: { [key in Roles]: string } = {
    [Roles.analitic]: "Аналтика",
    [Roles.crm]: "CRM",
    [Roles.api]: "3CX API",
    [Roles.autoDial]: "Автообзвон",
    [Roles.kpi]: "KPI колл-центра",
    [Roles.sms]: "SMS",
    [Roles.telegram]: "Telegram",
}


export const AVALIABLE_ROLES: Roles[] = [Roles.analitic , Roles.crm, Roles.api, Roles.autoDial, Roles.kpi, Roles.sms, Roles.telegram];