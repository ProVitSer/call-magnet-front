import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { LoginModel, LoginResponse } from '../models/login';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthRequestService {
    private readonly serverUrl = environment.API_GATEWAY_URL;

    constructor(private http: HttpClient) {}

    public signIn(payload: LoginModel): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.serverUrl}/auth/login`, payload).pipe(catchError(this.errorHandler));
    }

    public verify(verifyId: string): Observable<any> {
        return;
        // return this.http
        //   .post<VerifyUserResponse>(`${this.serverUrl}/auth/verify-user`, { token: verifyId})
        //   .pipe(catchError(this.errorHandler));
    }

    private errorHandler(e) {
        return throwError(e.message || 'Ошибка авторизации');
    }
}
