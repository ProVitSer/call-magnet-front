import { LoginResponse, UserData } from "./login";

export interface TokenPayload {
    sub: string;
    iat: number;
    exp: number;
}

export interface SetsCookiesData extends LoginResponse {
    accessToken: string;
    refreshToken: string;
    clientId: string;
}

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