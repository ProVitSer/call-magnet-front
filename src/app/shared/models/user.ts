export interface UserData {
    clientId: number;
    userId: number;
    firstname: string;
    lastname: string;
    company: string;
}


export enum Role {
    User = 'User',
    Manager = 'Manager',
    Admin = 'Admin',
    API = 'Api',
}

export enum Permission {
    Delete = 'Delete',
    Create = 'Create',
    Update = 'Update',
    Read = 'Read',
}

