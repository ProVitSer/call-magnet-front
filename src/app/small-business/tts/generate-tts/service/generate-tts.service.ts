import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { GetTtsFilesQuery, GetTtsFilesResult, ListVoicesData, TtsConverData, TtsVoice } from '../../models/tts.model';

@Injectable({
    providedIn: 'root',
})
export class GenerateTtsFileService {
    private readonly apiUrl = `${environment.API_GATEWAY_URL}`;
    private readonly ttsFilesUrl = `${this.apiUrl}/voice-kit/tts`;

    constructor(
        public router: Router,
        private http: HttpClient,
    ) {}

    public convertOnline(data: TtsConverData) {
        return this.http.post(`${this.ttsFilesUrl}/convert/online`, data, { responseType: 'blob', observe: 'body' });
    }

    public async convertWithSave(data: TtsConverData) {
        return firstValueFrom(
            this.http.post(`${this.ttsFilesUrl}/convert/file`, data).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }

    public async getVoices(data: TtsVoice) {
        return firstValueFrom(
            this.http.post<ListVoicesData[]>(`${this.ttsFilesUrl}/voices`, data).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }
}
