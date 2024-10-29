import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
    AddPacConnectionData,
    CheckConnectionResult,
    GetTokenResponse,
    PbxApiSettings,
    UpdatePacConnectionData,
} from '../models/pbx-api-settings.model.js';
import { catchError } from 'rxjs/operators';
import { throwError, firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PbxApiSettingsService {
    private readonly apiUrl = `${environment.API_GATEWAY_URL}`;

    private readonly pacUrl = `${this.apiUrl}/pac`;

    constructor(
        public router: Router,
        private http: HttpClient,
    ) {}

    public getPacProgramm(selectedOS: string) {
        return this.http

            .get(`${this.apiUrl}/software-distribution/programm`, { params: { os: selectedOS }, responseType: 'blob' })
            .subscribe(
                (response: Blob) => {
                    const downloadURL = window.URL.createObjectURL(response);

                    const link = document.createElement('a');

                    link.href = downloadURL;

                    link.download = `installer-${selectedOS}.exe`;

                    link.click();
                },

                (error) => {
                    return throwError(error);
                },
            );
    }

    public getPacConfig() {
        return this.http.get<PbxApiSettings>(`${this.pacUrl}/pac-connector`).pipe(
            catchError((error) => {
                return throwError(error);
            }),
        );
    }

    public addPacConfig(data: AddPacConnectionData) {
        return this.http.post<void>(`${this.pacUrl}/pac-connector`, data).pipe(
            catchError((error) => {
                return throwError(error);
            }),
        );
    }

    public deletePacConnector() {
        return this.http.delete<void>(`${this.pacUrl}/pac-connector`).pipe(
            catchError((error) => {
                return throwError(error);
            }),
        );
    }

    public updatePacConnector(data: UpdatePacConnectionData) {
        return this.http.put<void>(`${this.pacUrl}/pac-connector`, data).pipe(
            catchError((error) => {
                return throwError(error);
            }),
        );
    }

    public async getToken() {
        return firstValueFrom(
            this.http.get<GetTokenResponse>(`${this.pacUrl}/api-token`).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }

    public async checkConnection() {
        return firstValueFrom(
            this.http.get<CheckConnectionResult>(`${this.pacUrl}/pac-connector/check-connection`).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }
}
