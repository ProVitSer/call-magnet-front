import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { GetTgMessagesRequest, GetTgMessagesResult } from '../models/tg-messages.model';

@Injectable({
    providedIn: 'root',
})
export class TgMessagesService {
    private readonly apiUrl = `${environment.API_GATEWAY_URL}`;
    private readonly ptgMessagesUrl = `${this.apiUrl}/tg/messages`;

    constructor(
        public router: Router,
        private http: HttpClient,
    ) {}

    public async getTgMessages(data: GetTgMessagesRequest) {
        const params = {
            ...data,
        };
        return firstValueFrom(
            this.http.get<GetTgMessagesResult>(`${this.ptgMessagesUrl}`, { params }).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }
}
