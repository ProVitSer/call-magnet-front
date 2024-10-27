import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { AddSmartRouting, PbxExtensionList, SmartRoutingConfigData } from '../models/smart-routing.model';

@Injectable({
    providedIn: 'root',
})
export class SmartRoutingService {
    private readonly apiUrl = `${environment.API_GATEWAY_URL}`;
    private readonly smartRoutingUrl = `${this.apiUrl}/smart-routing`;

    constructor(
        public router: Router,
        private http: HttpClient,
    ) {}

    public async getPbxExtension() {
        return firstValueFrom(
            this.http.get<PbxExtensionList[]>(`${this.smartRoutingUrl}/pbx-extension`).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }

    public async getSmartRouting() {
        return firstValueFrom(
            this.http.get<SmartRoutingConfigData[]>(`${this.smartRoutingUrl} `).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }

    public async deleteSmartRoutingById(id: number) {
        return firstValueFrom(
            this.http.delete<void>(`${this.smartRoutingUrl}`, { body: { id } }).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }

    public async addSmartRouting(data: AddSmartRouting) {
        return firstValueFrom(
            this.http.post<void>(`${this.smartRoutingUrl}`, data).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }
}
