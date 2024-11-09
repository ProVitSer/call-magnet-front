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
    private readonly cqaConfigUrlUrl = environment.CQA_CONFIG_URL;

    constructor(
        public router: Router,
        private http: HttpClient,
    ) {}

    public async createCqaConfig(formData: FormData) {
        return firstValueFrom(
            this.http.post<void>(`${this.cqaConfigUrlUrl}`, formData, {}).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }

    public async updateCqaVoiceFiles(formData: FormData) {
        return firstValueFrom(
            this.http.put<void>(`${this.cqaConfigUrlUrl}/files`, formData, {}).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }

    public async getCqaClientConfig() {
        return firstValueFrom(
            this.http.get<CqaConfig>(`${this.cqaConfigUrlUrl}`).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }

    public getCqaVoiceFile(fileId: number) {
        return this.http.get(`${this.cqaConfigUrlUrl}/file/${fileId}`, { responseType: 'blob', observe: 'body' });
    }

    public async updateAi(isAiEnabled: boolean) {
        return firstValueFrom(
            this.http.put<void>(`${this.cqaConfigUrlUrl}/ai`, { isAiEnabled }).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }
}
