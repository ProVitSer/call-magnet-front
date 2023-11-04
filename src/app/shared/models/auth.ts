import { Menu } from "./login";

export interface TokenPayload {
    sub: string;
    iat: number;
    exp: number;
}

export interface SetsCookiesData extends UserData{
    accessToken: string;
    refreshToken: string;
}

export interface UserData {
    clientId: string;
    userRoles: string[];
}
