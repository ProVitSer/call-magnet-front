import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { CallAnanliticsData } from '../models/calls-analytics.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class CallsAnaliticsService {
    private readonly analiticUrl = environment.CALL_ANALITICS_URL;

    constructor(
        public router: Router,
        private http: HttpClient,
    ) {}

    public async getCallAnalitics() {
        return firstValueFrom(
            this.http.get<CallAnanliticsData>(`${this.analiticUrl}/analitic`).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }
}
