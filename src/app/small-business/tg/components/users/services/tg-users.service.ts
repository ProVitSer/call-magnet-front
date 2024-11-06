import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { AddTgUser, GetTgUsersQuery, GetTgUsersResult, UpdateTgUser } from '../models/tg-users.model';

@Injectable({
    providedIn: 'root',
})
export class TgUsersService {
    private readonly tgUsersUrl = environment.TG_USERS_URL;

    constructor(
        public router: Router,
        private http: HttpClient,
    ) {}

    public async getTgUsers(data: GetTgUsersQuery) {
        const params = {
            ...data,
        };
        return firstValueFrom(
            this.http.get<GetTgUsersResult>(`${this.tgUsersUrl}`, { params }).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }

    public async addTgUser(data: AddTgUser) {
        return firstValueFrom(
            this.http.post<void>(`${this.tgUsersUrl}`, data).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }

    public async deleteTgUser(id: number) {
        return firstValueFrom(
            this.http.delete<void>(`${this.tgUsersUrl}`, { body: { id } }).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }

    public async updateTgUser(data: UpdateTgUser) {
        return firstValueFrom(
            this.http.put<void>(`${this.tgUsersUrl}`, data).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }
}
