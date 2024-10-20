import { Roles } from "app/shared/models/user";

export interface BaseUsersResponse {
    message: string;
}

export interface ClientInfoResponse {
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    company: string;
    status: Status;
    roles: Roles[];
}

export enum Status {
    active = 'active',
    deactivated = 'deactivated',
}



export interface UpdateClientInfoResponse extends BaseUsersResponse {
    result: boolean;
}


export interface UpdateClientInfoData {
    firstname: string;
    lastname: string;
    phoneNumber: string;
    company: string;
}

export interface ChangePasswordData {
    oldPassword: string;
    newPassword: string;
}

export interface ChangePasswordResponse extends BaseUsersResponse {}