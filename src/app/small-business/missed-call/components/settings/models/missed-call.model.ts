export interface MissedCall {
    trunkName: string;
    missedServiceType: MissedServiceType[];
}

export enum MissedServiceType {
    tg = 'tg',
    crm = 'crm',
    sms = 'sms',
}

export interface UpdateMissedCall {
    id: number;
    trunkName: string;
    missedServiceType: MissedServiceType[];
}

export interface AddMissedCall {
    trunkName: string;
    missedServiceType: MissedServiceType[];
}
