
export interface TokenPayload {
    sub: string;
    role: string;
    iat: number;
    exp: number;
}

export interface SetLocalStorageData {
    clientId: string;
    role: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
}