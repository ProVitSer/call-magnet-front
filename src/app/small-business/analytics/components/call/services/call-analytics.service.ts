import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { CallAnanliticsData } from '../models/call-analytics';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class CallAnaliticsService {
    private readonly apiUrl = `${environment.API_GATEWAY_URL}`;
    private readonly ptgMessagesUrl = `${this.apiUrl}/call-analytics`;

    constructor(
        public router: Router,
        private http: HttpClient,
    ) {}

    public async getCallAnalitics() {
        return firstValueFrom(
            this.http.get<CallAnanliticsData>(`${this.ptgMessagesUrl}`).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }
}
