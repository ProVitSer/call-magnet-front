import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { CreateSmsConfig, SmsConfigData, UpdateSmsConfig } from '../models/sms-settings.model';

@Injectable({
    providedIn: 'root',
})
export class SmsSettingsService {
    private readonly smsSettingsUrl = environment.SMS_CONFIG_URL;
    constructor(
        public router: Router,
        private http: HttpClient,
    ) {}
    public async getSmsConfigs() {
        return firstValueFrom(
            this.http.get<SmsConfigData>(`${this.smsSettingsUrl}`).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }
    public async createSmsConfig(data: CreateSmsConfig) {
        return firstValueFrom(
            this.http.post<void>(`${this.smsSettingsUrl}`, data).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }
    public async deleteSmsConfig() {
        return firstValueFrom(
            this.http.delete<void>(`${this.smsSettingsUrl}`).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }
    public async updateSmsConfig(data: UpdateSmsConfig) {
        return firstValueFrom(
            this.http.put<void>(`${this.smsSettingsUrl}`, data).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }
}
