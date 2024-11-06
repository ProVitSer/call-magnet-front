import { Products } from './license';
import { LoginResponse } from './login';
import { Permission, Role } from './user';

export interface TokenPayload {
    userId: number;
    firstname: string;
    lastname: string;
    company: string;
    clientId: number;
    permissions: Permission[];
    roles: Role[];
    products: Products[];
}

export interface SetsCookiesData extends LoginResponse, TokenPayload {}

export interface RefreshTokenResponse {
    accessToken: string;
}

export interface RegisterUserData {
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: number;
    password: string;
    company: string;
}

export class BaseAuthResponse {
    email: string;
    message: string;
}

export type RegisterUserResponse = BaseAuthResponse;

export type VerifyUserResponse = BaseAuthResponse;

export interface EncryptedUserData {
    clientId: number;
    userId: number;
    firstname: string;
    lastname: string;
    company: string;
}
