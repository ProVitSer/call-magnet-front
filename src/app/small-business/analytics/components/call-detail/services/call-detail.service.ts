import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { CdrData } from '../../cdr/models/cdr-analytics';
import { GetStt, RecognizeSpeech } from '../models/call-detail';

@Injectable({
    providedIn: 'root',
})
export class CallDetailsService {
    private readonly apiUrl = `${environment.API_GATEWAY_URL}`;
    private readonly cdrUrl = `${this.apiUrl}/call-analytics`;
    private readonly sttUrl = `${this.apiUrl}/voice-kit/stt/dialog`;

    constructor(
        public router: Router,
        private http: HttpClient,
    ) {}

    public async getCallData(callId: any) {
        return firstValueFrom(
            this.http.get<CdrData[]>(`${this.cdrUrl}/cdr/call/${callId}`).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }

    public async getSttDialog(applicationId: string) {
        return firstValueFrom(
            this.http.get<GetStt>(`${this.sttUrl}/${applicationId}`).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }

    public async deleteSttDialog(applicationId: string) {
        return firstValueFrom(
            this.http.delete<void>(`${this.sttUrl}/${applicationId}`).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }

    public async recognizeSpeech(data: RecognizeSpeech) {
        return firstValueFrom(
            this.http.post<void>(`${this.sttUrl}`, data).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }
}
