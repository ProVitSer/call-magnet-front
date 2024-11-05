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
    sourceDn: string;
    destinationDn: string;
    sourceCallerId: string;
    destinationCallerId: string;
    answered: boolean;
    ringingDuration: string;
    talkingDuration: string;
    reason: string;
    segmentId: number;
    recordingUrl: string | null;
    date: string;
}
