export interface GetTgUsersQuery {
    page: string;
    pageSize: string;
    name?: string;
}

export interface GetTgUsersResult {
    data: TgUsersData[];
    totalRecords: number;
}

export interface TgUsersData {
    id: number;
    name: string;
    tgUserName: string;
    extension: string;
    date: string;
}

export interface AddTgUser {
    name: string;
    tgUserName: string;
    extension: string;
}

export interface UpdateTgUser {
    id: number;
    name?: string;
    extension?: string;
}
