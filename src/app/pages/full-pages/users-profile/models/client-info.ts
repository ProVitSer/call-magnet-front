export interface ClientInfoResponse {
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    company: string;
    status: Status;
    roles: string[];
}



export enum Status {
    active = 'active',
    deactivated = 'deactivated',
}



export interface UpdateClientInfoResponse {
    result: boolean;
    message: string;
}


export interface UpdateClientInfoData {
    firstname: string;
    lastname: string;
    phoneNumber: string;
    company: string;
}