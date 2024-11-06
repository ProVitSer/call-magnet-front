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
    private readonly cqaStatUrl = environment.CQA_STAT_URL;

    constructor(
        public router: Router,
        private http: HttpClient,
    ) {}

    public async getCqaStatistic(data: GetCqaStatisticQuery) {
        return firstValueFrom(
            this.http.get<GetCqaStatisticResult>(`${this.cqaStatUrl}`, { params: { ...data } }).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }
}
