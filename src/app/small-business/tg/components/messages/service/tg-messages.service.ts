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
    private readonly tgMessagesUrl = environment.TG_MESSAGES_URL;

    constructor(
        public router: Router,
        private http: HttpClient,
    ) {}

    public async getTgMessages(data: GetTgMessagesRequest) {
        const params = {
            ...data,
        };
        return firstValueFrom(
            this.http.get<GetTgMessagesResult>(`${this.tgMessagesUrl}`, { params }).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }
}
