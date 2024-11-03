export interface GetCdrRequest {
    page: string;
    pageSize: string;
    dateString?: string;
    phoneNumber?: string;
}

export interface GetCdrResult {
    data: CdrData[];
    totalRecords: number;
}

export interface CdrData {
    callDate: string;
    callId: number;
    sourceDisplayName: string;
    destinationDisplayName: string;
    answered: boolean;
    ringingDuration: string;
    talkingDuration: string;
    reason: string;
    recordingUrl: string | null;
    date: string;
}
