export interface CreateTrunk {
    applicationServiceType: ApplicationServiceType;
    authId: string;
    authPassword: string;
    pbxIp: string;
}

export enum ApplicationServiceType {
    cqa = 'cqa',
    dialer = 'dialer',
}

export interface UpdateTrunk {
    trunkId: string;
    authId?: string;
    authPassword?: string;
    pbxIp?: string;
    [key: string]: any;
}

export interface TrunkData {
    id: number;
    trunkId: string;
    applicationServiceType: ApplicationServiceType;
    trunkStatus: TrunkRegistryStatus;
    active: boolean;
}

export enum TrunkRegistryStatus {
    Registered = 'Registered',
    Unregistered = 'Unregistered',
    Rejected = 'Rejected',
    Failed = 'Failed',
}

export interface TrunkDataResult {
    trunkId: string;
    trunkStatus: TrunkRegistryStatus;
    trunkData: {
        authId: string;
        authPassword: string;
        pbxIp: string;
    };
}

export interface TrunkTableData {
    trunkId: string;
    trunkStatus: TrunkRegistryStatus;
    authId: string;
    authPassword: string;
    pbxIp: string;
}
