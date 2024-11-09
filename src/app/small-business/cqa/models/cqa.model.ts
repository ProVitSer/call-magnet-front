export interface GetCqaStatisticResult {
    data: CqaStatisticData[];
    totalRecords: number;
}

export interface CqaStatisticData {
    rating?: string;
    callResult?: CallResult;
    clientNumber?: string;
    managerData?: string;
    managerNumber?: string;
    country?: string;
    region?: string;
    city?: string;
    date: string;
}

export enum CallResult {
    successful = 'successful',
    unsuccessful = 'unsuccessful',
    unknown = 'unknown',
}

export interface GetCqaStatisticQuery {
    page: string;
    pageSize: string;
    dateString?: string;
    managerNumber?: string;
}

export interface CqaConfig {
    id: number;
    audioFiles: { fileId: number; cqaFileType: CqaFileType }[];
    voipTrunkId: string;
    aiEnabled: boolean;
    clientId: number;
    createdAt: Date;
    updatedAt: Date;
}

export enum CqaFileType {
    cqaMain = 'cqa-main',
    cqaGoodbye = 'cqa-goodbye',
}
