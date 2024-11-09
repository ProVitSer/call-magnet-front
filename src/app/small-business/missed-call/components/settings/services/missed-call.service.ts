import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { AddMissedCall, MissedCall, UpdateMissedCall } from '../models/missed-call.model';

@Injectable({
    providedIn: 'root',
})
export class MissedCallService {
    private readonly missedCallUrl = environment.MISSED_CALL_URL;

    constructor(
        public router: Router,
        private http: HttpClient,
    ) {}

    public async getMissedCallConfigList() {
        return firstValueFrom(
            this.http.get<MissedCall[]>(`${this.missedCallUrl} `).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }

    public async getTrunkName() {
        return firstValueFrom(
            this.http.get<string[]>(`${this.missedCallUrl}/trunks/name`).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }

    public async deleteMissedCall(id: number) {
        return firstValueFrom(
            this.http.delete<void>(`${this.missedCallUrl}/${id}`).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }

    public async updateMissedCall(data: UpdateMissedCall) {
        return firstValueFrom(
            this.http.put<MissedCall[]>(`${this.missedCallUrl}`, data).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }

    public async addMissedCallConfig(data: AddMissedCall) {
        return firstValueFrom(
            this.http.post<void>(`${this.missedCallUrl}`, data).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }
}
