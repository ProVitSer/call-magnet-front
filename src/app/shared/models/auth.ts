import { Menu, UserData } from "./login";

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