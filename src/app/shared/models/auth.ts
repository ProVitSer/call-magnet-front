import { ProductType } from "./license";
import { LoginResponse } from "./login";
import { Permission, Role } from "./user";


export interface TokenPayload {
    userId: number;
    clientId: number;
    permissions: Permission[];
    roles: Role[];
    products: Products[];
}

export interface Products {
    id: number;
    productType: ProductType;
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

export interface RegisterUserResponse extends BaseAuthResponse{};

export interface VerifyUserResponse extends BaseAuthResponse{}

export interface ForogtPasswordData {
    email: string;
}

export interface ForogtPasswordResponse extends BaseAuthResponse{}

export interface VerificationCodeResponse {
    isValid: boolean;
}

export interface ResetPasswordData {
    verificationCode: string;
    password: string;
}

export interface EncryptedUserData {
    clientId: string;
}
