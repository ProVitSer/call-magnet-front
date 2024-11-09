export interface AddCrmConfigData {
    adminId: number;
    domain: string;
    hash: string;
    userTaskId?: number;
    taskGroup?: number;
    deadlineMin?: number;
    token: string;
}

export interface UpdateCrmConfigData {
    adminId?: number;
    domain?: string;
    hash?: string;
    userTaskId?: number;
    taskGroup?: number;
    deadlineMin?: number;
    token?: string;
}

export interface CrmConfigData {
    id: number;
    adminId: number;
    userTaskId: number;
    taskGroup: number;
    deadlineMin?: number;
    domain: string;
    hash: string;
    token: string;
}

export enum CrmService {
    alfa = 'alfa-crm',
    amocrm = 'amocrm',
    bitrix = 'bitrix',
}
