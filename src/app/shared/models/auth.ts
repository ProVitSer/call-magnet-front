import { UserData } from "./login";

export interface TokenPayload {
    sub: string;
    iat: number;
    exp: number;
}

export interface SetsCookiesData extends UserData {
    accessToken: string;
    refreshToken: string;
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

export interface RegisterUserResponse {
    email: string;
    message: string;
}


export interface VerifyUserResponse extends RegisterUserResponse{}