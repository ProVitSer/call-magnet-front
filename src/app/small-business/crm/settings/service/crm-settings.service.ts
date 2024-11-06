import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { AddCrmConfigData, CrmConfigData, UpdateCrmConfigData } from '../models/crm-settings.model';

@Injectable({
    providedIn: 'root',
})
export class CrmSettingsService {
    private readonly crmSettingsUrl = environment.CRM_URL;
    constructor(
        public router: Router,
        private http: HttpClient,
    ) {}
    public async getCrmConfig() {
        return firstValueFrom(
            this.http.get<CrmConfigData>(`${this.crmSettingsUrl}`).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }
    public async createCrmConfig(data: AddCrmConfigData) {
        return firstValueFrom(
            this.http.post<void>(`${this.crmSettingsUrl}`, data).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }
    public async deleteCrmConfig() {
        return firstValueFrom(
            this.http.delete<void>(`${this.crmSettingsUrl}`).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }
    public async updateCrmConfig(data: UpdateCrmConfigData) {
        return firstValueFrom(
            this.http.put<void>(`${this.crmSettingsUrl}`, data).pipe(
                catchError((error) => {
                    throw error;
                }),
            ),
        );
    }
}
