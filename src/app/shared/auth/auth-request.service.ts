import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'environments/environment';
import { LoginModel, LoginResponse } from '../models/login';
import { HttpResponse } from '../models/response';
import { BaseAuthResponse, ForogtPasswordData, ForogtPasswordResponse, VerificationCodeResponse, VerifyUserResponse, ResetPasswordData } from '../models/auth';
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class AuthRequestService {
  private readonly serverUrl = environment.API_GATEWAY_URL;
  
  constructor( 
    private http: HttpClient,    
    ) {}

  public signIn(payload: LoginModel): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.serverUrl}/auth/login`, payload)
      .pipe(catchError((error) => {
        return throwError('Ошибка авторизации');
      }));
  }

  public forogtPassword(data: ForogtPasswordData): Observable<HttpResponse<ForogtPasswordResponse>> {
    return this.http
      .post<HttpResponse<ForogtPasswordResponse>>(`${this.serverUrl}/auth/forgot-password`, data)
      .pipe(catchError(this.errorHandler));
  }


  public verify(verifyId: string): Observable<HttpResponse<VerifyUserResponse>> {
    return this.http
      .post<HttpResponse<VerifyUserResponse>>(`${this.serverUrl}/auth/verify-user`, { token: verifyId})
      .pipe(catchError(this.errorHandler));
  }


  public checkVerificationCode(id: string): Observable<HttpResponse<VerificationCodeResponse>> {
    return this.http
      .post<HttpResponse<VerificationCodeResponse>>(`${this.serverUrl}/auth/check-verification-code`, { code: id})
      .pipe(catchError(this.errorHandler));
  }

  public resetPassword(data: ResetPasswordData): Observable<HttpResponse<BaseAuthResponse>> {
    return this.http
      .post<HttpResponse<BaseAuthResponse>>(`${this.serverUrl}/auth/reset-password`, data)
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(e) {
    let errorMessage = '';
    if (e.error && e.error.message) {
      errorMessage = e.error.message;
    } else {
      errorMessage = `Error Code: ${e.status}\nMessage: ${e.message}`;
    }
    return throwError(errorMessage);
  }
}