import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { CdrData } from '../../cdr/models/cdr-analytics';

@Injectable({
    providedIn: 'root',
})
export class CallDetailsService {
    private readonly apiUrl = `${environment.API_GATEWAY_URL}`;
    private readonly cdrUrl = `${this.apiUrl}/call-analytics`;

    constructor(
        public router: Router,
        private http: HttpClient,
    ) {}

    public async getCallData(callId: any) {
        return firstValueFrom(
            this.http.get<CdrData[]>(`${this.cdrUrl}/cdr/call/${callId}`).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }
}
