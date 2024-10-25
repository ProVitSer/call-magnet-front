export interface CreatTgConfig {
    name: string;
    token: string;
    chatId: string;
}

export interface DeleteTgConfig {
    id: number;
}

export interface UpdateTgConfig {
    id: number;
    token?: string;
    chatId?: string;
}

export interface TgConfigData {
    id: number;
    name: string;
    token: string;
    chatId: string;
}

export interface SendTestMessage {
    id: number;
}
