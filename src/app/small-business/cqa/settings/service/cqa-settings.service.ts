import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { CqaConfig } from '../../models/cqa.model';

@Injectable({
    providedIn: 'root',
})
export class CqaSettingsService {
    private readonly apiUrl = `${environment.API_GATEWAY_URL}`;
    private readonly ptgMessagesUrl = `${this.apiUrl}/cqa/config`;

    constructor(
        public router: Router,
        private http: HttpClient,
    ) {}

    public async createCqaConfig(formData: FormData) {
        return firstValueFrom(
            this.http.put<void>(`${this.ptgMessagesUrl}/files`, formData, {}).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }

    public async getCqaClientConfig() {
        return firstValueFrom(
            this.http.get<CqaConfig>(`${this.ptgMessagesUrl}`).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }

    public getCqaVoiceFile(fileId: number) {
        return this.http.get(`${this.ptgMessagesUrl}/file/${fileId}`, { responseType: 'blob', observe: 'body' });
    }

    public async updateAi(isAiEnabled: boolean) {
        return firstValueFrom(
            this.http.put<void>(`${this.ptgMessagesUrl}/ai`, { isAiEnabled }).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }
}
