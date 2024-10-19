export enum ProductType {
    api = 'api',
    sms = 'sms',
    bitrix = 'crm-bitrix',
    alfacrm = 'crm-alfa',
    amocrm = 'crm-amocrm',
    customcrm = 'crm-custom',
    callingTts = 'calling-tts',
    telegram = 'telegram',
    sm = 'smart-routing',
    tts = 'tts',
    stt = 'stt',
    analitic = 'analitic',
    cqa = 'cqa',
    missedCall = 'missed-call',
}

export interface Products {
    id: number;
    productType: ProductType;
}


export const LICENSE_PRODUCT_DESCRIPTION: { [key in ProductType]?: string } = {
    [ProductType.analitic]: "Аналтика",
    [ProductType.bitrix]: "CRM",
    [ProductType.api]: "3CX API",
    [ProductType.cqa]: "KPI колл-центра",
    [ProductType.sms]: "SMS",
    [ProductType.telegram]: "Telegram",
    [ProductType.stt]: "Диалог в текст",
    [ProductType.tts]: "TTS",
}


export const AVALIABLE_PRODUCT: ProductType[] = [  ProductType.analitic, ProductType.bitrix, ProductType.api, ProductType.cqa, ProductType.sms, ProductType.telegram, ProductType.stt, ProductType.tts ];