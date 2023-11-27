import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'environments/environment';
import { LoginModel, LoginResponse } from '../models/login';
import { HttpResponse } from '../models/response';
import { BaseAuthResponse, ForogtPasswordData, ForogtPasswordResponse, RefreshTokenResponse, RegisterUserData, RegisterUserResponse, VerificationCodeResponse, 
  VerifyUserResponse, ResetPasswordData } from '../models/auth';
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthRequestService {
  private readonly serverUrl = environment.API_GATEWAY_URL;
  constructor( 
    private http: HttpClient,
    private authService: AuthService
    ) {}

  public signIn(payload: LoginModel): Observable<HttpResponse<LoginResponse>> {
    return this.http
      .post<HttpResponse<LoginResponse>>(`${this.serverUrl}auth/login`, payload)
      .pipe(catchError(this.errorHandler));
  }

  public refreshToken(): Observable<HttpResponse<RefreshTokenResponse>> {
    return this.http
      .get<HttpResponse<LoginResponse>>(`${this.serverUrl}auth/refresh`,  { headers: {
        'Authorization': 'Bearer ' + JSON.parse(this.authService.getRefreshToken())
      } })
      .pipe(catchError(this.errorHandler));
  }

  public register(data: RegisterUserData): Observable<HttpResponse<RegisterUserResponse>> {
    return this.http
      .post<HttpResponse<RegisterUserResponse>>(`${this.serverUrl}auth/register`, data)
      .pipe(catchError(this.errorHandler));
  }

  public forogtPassword(data: ForogtPasswordData): Observable<HttpResponse<ForogtPasswordResponse>> {
    return this.http
      .post<HttpResponse<ForogtPasswordResponse>>(`${this.serverUrl}auth/forgot-password`, data)
      .pipe(catchError(this.errorHandler));
  }


  public verify(verifyId: string): Observable<HttpResponse<VerifyUserResponse>> {
    return this.http
      .post<HttpResponse<VerifyUserResponse>>(`${this.serverUrl}auth/verify-user`, { token: verifyId})
      .pipe(catchError(this.errorHandler));
  }


  public checkVerificationCode(id: string): Observable<HttpResponse<VerificationCodeResponse>> {
    return this.http
      .post<HttpResponse<VerificationCodeResponse>>(`${this.serverUrl}auth/check-verification-code`, { code: id})
      .pipe(catchError(this.errorHandler));
  }

  public resetPassword(data: ResetPasswordData): Observable<HttpResponse<BaseAuthResponse>> {
    return this.http
      .post<HttpResponse<BaseAuthResponse>>(`${this.serverUrl}auth/reset-password`, data)
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