import { ProductType } from 'app/shared/models/license';
import { Permission, Role } from 'app/shared/models/user';

export interface BaseUsersResponse {
    message: string;
}

export interface UserInfoResponse {
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    company: string;
    license: string;
    products: ProductType[];
    permissions: Permission[];
    roles: Role[];
}

export enum Status {
    active = 'active',
    deactivated = 'deactivated',
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UpdateClientInfoResponse {}

export interface UpdateClientInfoData {
    userId: number;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    company: string;
}

export interface ChangePasswordData {
    userId: number;
    oldPassword: string;
    newPassword: string;
}

export type ChangePasswordResponse = BaseUsersResponse;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VerificationCodeResponse {}

export interface ResetPasswordData {
    password: string;
    verificationCode: string;
}

export interface ForogtPasswordData {
    email: string;
}

export interface CheckVerificationCodeResponse {
    isValid: boolean;
}
