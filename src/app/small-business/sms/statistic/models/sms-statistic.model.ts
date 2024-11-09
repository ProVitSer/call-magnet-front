export interface GetSmsStatisticResult {
    data: SmsStatisticData[];
    totalRecords: number;
}

export interface SmsStatisticData {
    smsId: string;
    externalNumber: string;
    smsText: string;
    smsSendStatus: SmsSendStatus;
    smsSendResult: string;
    date: string;
}

export enum SmsSendStatus {
    apiFail = 'apiFail',
    error = 'error',
    inProgress = 'inProgress',
    completed = 'completed',
    cancel = 'cancel',
}

export interface GetSmsStatisticQuery {
    page: string;
    pageSize: string;
    dateString?: string;
    phoneNumber?: string;
}
