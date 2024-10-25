export interface PbxApiSettings {
    id: number;
    ip: string;
    port: number;
    active: boolean;
    clientId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface AddPacConnectionData {
    ip: string;
    port: number;
}

export interface UpdatePacConnectionData {
    ip?: string;
    port?: number;
}

export interface GetTokenResponse {
    token: string;
}

export interface CheckConnectionResult {
    online: boolean;
}
