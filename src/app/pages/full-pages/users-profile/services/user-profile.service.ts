import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import {
    BaseUsersResponse,
    ChangePasswordData,
    ChangePasswordResponse,
    CheckVerificationCodeResponse,
    ForogtPasswordData,
    ResetPasswordData,
    UpdateClientInfoData,
    UpdateClientInfoResponse,
    UserInfoResponse,
} from '../models/users-profile.model';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class UserProfileService {
    private readonly userProfileUrl = environment.USER_PROFILE_URL;

    constructor(
        public router: Router,
        private http: HttpClient,
    ) {}

    public getUserInfo(userId: number): Observable<UserInfoResponse> {
        return this.http.get<UserInfoResponse>(`${this.userProfileUrl}/${userId}`).pipe(catchError(this.errorHandler));
    }

    public updateUserInfo(data: UpdateClientInfoData): Observable<UpdateClientInfoResponse> {
        return this.http.put<UpdateClientInfoResponse>(`${this.userProfileUrl}`, data).pipe(catchError(this.errorHandler));
    }

    public changePassword(data: ChangePasswordData): Observable<ChangePasswordResponse> {
        return this.http.post<ChangePasswordResponse>(`${this.userProfileUrl}/change-password`, data).pipe(catchError(this.errorHandler));
    }

    public resetPassword(data: ResetPasswordData): Observable<BaseUsersResponse> {
        return this.http.post<BaseUsersResponse>(`${this.userProfileUrl}/reset-password`, data).pipe(catchError(this.errorHandler));
    }

    public forogtPassword(data: ForogtPasswordData): Observable<BaseUsersResponse> {
        return this.http.post<BaseUsersResponse>(`${this.userProfileUrl}/forgot-password`, data).pipe(catchError(this.errorHandler));
    }

    public checkVerificationCode(verificationCode: string): Observable<CheckVerificationCodeResponse> {
        return this.http
            .post<CheckVerificationCodeResponse>(`${this.userProfileUrl}/check-verification-code`, { verificationCode })
            .pipe(catchError(this.errorHandler));
    }

    private errorHandler(e: HttpErrorResponse) {
        return throwError(e.error.error.message || 'Неизвестная ошибка');
    }
}
