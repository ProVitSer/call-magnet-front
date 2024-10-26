export interface CreateSmsConfig {
    login: string;
    psw: string;
    smsText: string;
}

export interface SmsConfigData extends CreateSmsConfig {
    sender: string;
}

export interface UpdateSmsConfig {
    login?: string;
    psw?: string;
    smsText: string;
}

export enum SmsServices {
    smsc = 'smsc',
    smsAero = 'sms-aero',
    smsru = 'sms-ru',
}
