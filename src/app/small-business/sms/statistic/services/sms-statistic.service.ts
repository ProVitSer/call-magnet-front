import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { GetSmsStatisticQuery, GetSmsStatisticResult } from '../models/sms-statistic.model';

@Injectable({
    providedIn: 'root',
})
export class SmsStatisticService {
    private readonly smsSettingsUrl = environment.SMS_URL;
    constructor(
        public router: Router,
        private http: HttpClient,
    ) {}
    public async getSmsStatistic(data: GetSmsStatisticQuery) {
        const params = {
            ...data,
        };

        return firstValueFrom(
            this.http.get<GetSmsStatisticResult>(`${this.smsSettingsUrl}`, { params }).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }
}
