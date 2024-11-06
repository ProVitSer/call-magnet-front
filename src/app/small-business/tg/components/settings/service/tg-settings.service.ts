import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CreatTgConfig, DeleteTgConfig, SendTestMessage, TgConfigData, UpdateTgConfig } from '../models/tg-settings.model.js';
import { catchError } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TgSettingsService {
    private readonly tgSettingsUrl = environment.TG_CONFIG_URL;

    constructor(
        public router: Router,
        private http: HttpClient,
    ) {}

    public async getTgConfigs() {
        return firstValueFrom(
            this.http.get<TgConfigData[]>(`${this.tgSettingsUrl}`).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }

    public async createTgConfig(data: CreatTgConfig) {
        return firstValueFrom(
            this.http.post<void>(`${this.tgSettingsUrl}`, data).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }

    public async deleteTgConfig(data: DeleteTgConfig) {
        return firstValueFrom(
            this.http.delete<void>(`${this.tgSettingsUrl}`, { body: data }).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }

    public async updateTgConfig(data: UpdateTgConfig) {
        return firstValueFrom(
            this.http.put<TgConfigData>(`${this.tgSettingsUrl}`, data).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }

    public async sendTestMessage(data: SendTestMessage) {
        return firstValueFrom(
            this.http.post<TgConfigData>(`${this.tgSettingsUrl}/test-send`, data).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }
}
