import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { SendSmsData } from '../models/send-sms..model';

@Injectable({
    providedIn: 'root',
})
export class SendSmsSettingsService {
    private readonly smsSettingsUrl = environment.SMS_URL;
    constructor(
        public router: Router,
        private http: HttpClient,
    ) {}

    public async sendSms(data: SendSmsData) {
        return firstValueFrom(
            this.http.post<void>(`${this.smsSettingsUrl}`, data).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }
}
