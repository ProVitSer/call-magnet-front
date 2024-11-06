import { CdrData } from '../../cdr/models/cdr-analytic.model';

export interface GetStt {
    sttId: number;
    applicationId: string;
    sttRecognizeStatus: SttRecognizeStatus;
    textDialog?: string[];
}

export enum SttRecognizeStatus {
    done = 'done',
    inProgress = 'inProgress',
    error = 'error',
    completed = 'completed',
    notRecognize = 'notRecognize',
}

export interface TextDialogMessage {
    type: string;
    text: string;
}

export interface RecognizeSpeech {
    recordingUrl: string;
    applicationId: string;
    sttProviderType: STTProviderType;
}

export enum STTProviderType {
    yandex = 'yandex',
    sber = 'sber',
}

export interface CallDetailsData extends CdrData {
    sttRecognizeStatus: SttRecognizeStatus;
    textDialog: TextDialog[];
}

export interface TextDialog {
    type: string;
    text: string;
}
