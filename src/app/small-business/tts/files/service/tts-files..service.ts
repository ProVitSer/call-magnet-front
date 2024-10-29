import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { GetTtsFilesQuery, GetTtsFilesResult } from '../../models/tts.model';

@Injectable({
    providedIn: 'root',
})
export class TtsFilesService {
    private readonly apiUrl = `${environment.API_GATEWAY_URL}`;
    private readonly ttsFilesUrl = `${this.apiUrl}/voice-kit/tts`;

    constructor(
        public router: Router,
        private http: HttpClient,
    ) {}

    public async getTTSFiles(query: GetTtsFilesQuery) {
        const params = {
            ...query,
        };

        return firstValueFrom(
            this.http.get<GetTtsFilesResult>(`${this.ttsFilesUrl}`, { params }).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }

    public getTTSFile(ttsId: string) {
        return this.http.get(`${this.ttsFilesUrl}/ttsFile/${ttsId}`, { responseType: 'blob', observe: 'body' });
    }

    public async deleteTtsFile(ttsId: string) {
        return firstValueFrom(
            this.http.delete<void>(`${this.ttsFilesUrl}/ttsFile/${ttsId}`).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }
}
