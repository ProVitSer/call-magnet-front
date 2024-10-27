export interface PbxExtensionList {
    name: string;
    number: string;
}

export interface SmartRoutingConfigData {
    id: number;
    name: string;
    pbxExtension: string;
    routingService: RoutingServiceType;
    aiRouting: boolean;
    defaultRoutingNumber: string;
}

export enum RoutingServiceType {
    phonebook = 'phonebook',
    bitrix = 'crm-bitrix',
}

export interface AddSmartRouting {
    pbxExtension: string;
    name?: string;
    routingService: RoutingServiceType;
    aiRouting: boolean;
    defaultRoutingNumber: string;
}
