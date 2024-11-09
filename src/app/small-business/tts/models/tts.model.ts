export interface GetTtsFilesResult {
    data: TtsFilesData[];
    totalRecords: number;
}

export interface TtsFilesData {
    name: string;
    ttsId: number;
    ttsProviderType: TTSProviderType;
    text: string;
    date: string;
}

export interface GetTtsFilesQuery {
    page: string;
    pageSize: string;
    dateString?: string;
    name?: string;
}

export enum TTSProviderType {
    yandex = 'yandex',
    tinkoff = 'tinkoff',
    sber = 'sber',
}

export enum VoiceFileFormat {
    mp3 = 'mp3',
    wav = 'wav',
    raw = 'raw',
}

export interface TtsConverData {
    name: string;
    text: string;
    ttsType: TTSProviderType;
    voice?: string;
    emotion?: string;
}

export interface TtsVoice {
    ttsType: TTSProviderType;
}

export class ListVoicesData {
    name: string;
    emotions: string[];
}
