import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { GetCdrRequest, GetCdrResult } from '../models/cdr-analytic.model';

@Injectable({
    providedIn: 'root',
})
export class CdrAnaliticsService {
    private readonly cdrAnaliticsUrl = environment.CALL_ANALITICS_URL;

    constructor(
        public router: Router,
        private http: HttpClient,
    ) {}

    public async getCdr(data: GetCdrRequest) {
        const params = {
            ...data,
        };
        return firstValueFrom(
            this.http.get<GetCdrResult>(`${this.cdrAnaliticsUrl}/cdr`, { params }).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }
}
