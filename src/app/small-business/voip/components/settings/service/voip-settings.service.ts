import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { CreateTrunk, TrunkDataResult, UpdateTrunk } from '../models/voip-settings.model';

@Injectable({
    providedIn: 'root',
})
export class VoipSettingsService {
    private readonly apiUrl = `${environment.API_GATEWAY_URL}`;
    private readonly voipSettingsUrl = `${this.apiUrl}/voip/trunk`;
    constructor(
        public router: Router,
        private http: HttpClient,
    ) {}

    public async getTrunks() {
        return firstValueFrom(
            this.http.get<TrunkDataResult[]>(`${this.voipSettingsUrl}`).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }

    public async createTrunk(data: CreateTrunk) {
        return firstValueFrom(
            this.http.post<TrunkDataResult>(`${this.voipSettingsUrl}`, data).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }

    public async getTrunkStatusById(trunkId: string) {
        return firstValueFrom(
            this.http.get<TrunkDataResult>(`${this.voipSettingsUrl}`, { params: { trunkId } }).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }

    public async deleteTrunk(trunkId: string) {
        return firstValueFrom(
            this.http.delete<void>(`${this.voipSettingsUrl}/${trunkId}`, { params: { trunkId } }).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }

    public async updateTrunk(data: UpdateTrunk) {
        return firstValueFrom(
            this.http.put<TrunkDataResult>(`${this.voipSettingsUrl}`, data).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }
}
