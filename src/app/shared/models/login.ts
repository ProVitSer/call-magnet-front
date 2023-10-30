export interface LoginModel {
    email: string;
    password: string;
}


export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
}

