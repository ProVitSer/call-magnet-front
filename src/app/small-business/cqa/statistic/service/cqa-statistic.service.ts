import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { GetCqaStatisticQuery, GetCqaStatisticResult } from '../../models/cqa.model';

@Injectable({
    providedIn: 'root',
})
export class CqaStatisticService {
    private readonly apiUrl = `${environment.API_GATEWAY_URL}`;
    private readonly ptgMessagesUrl = `${this.apiUrl}/cqa/statistic`;

    constructor(
        public router: Router,
        private http: HttpClient,
    ) {}

    public async getCqaStatistic(data: GetCqaStatisticQuery) {
        return firstValueFrom(
            this.http.get<GetCqaStatisticResult>(`${this.ptgMessagesUrl}`, { params: { ...data } }).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }
}
