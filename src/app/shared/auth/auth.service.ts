import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { LoginModel, LoginResponse } from '../models/login';
import { HttpResponse } from '../models/response';
import { SetLocalStorageData } from '../models/auth';

@Injectable()
export class AuthService {
  private static projectKey = 'call-magnet-token';
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  private readonly serverUrl = environment.API_GATEWAY_URL;
  constructor( public router: Router, private http: HttpClient) {}

  public signIn(payload: LoginModel): Observable<HttpResponse<LoginResponse>> {
    return this.http
      .post<HttpResponse<LoginResponse>>(`${this.serverUrl}auth/login`, payload)
      .pipe(catchError(this.errorHandler));
  }


  public setLocalStorage(data: SetLocalStorageData): boolean {

    const encryptedClient: string = btoa(JSON.stringify({ clientId: data.clientId, role:  data.role}));
    const encryptedAccessToken: string = btoa(JSON.stringify(data.accessToken));
    const encryptedRefreshToken: string = btoa(JSON.stringify(data.refreshToken));

    const tokensData = {
      accessToken: encryptedAccessToken,
      refreshToken: encryptedRefreshToken,
      user: encryptedClient,
      accessTokenExpires: data.accessTokenExpires
    }

    if(encryptedClient && encryptedAccessToken && encryptedRefreshToken){
      localStorage.setItem(AuthService.projectKey, JSON.stringify(tokensData));
      return true;
    }
    return false;
  }

  errorHandler(e) {
    let errorMessage = '';
    let errorRes = '';
    if (e.error instanceof ErrorEvent) {
      errorMessage = e.error.message;
      errorRes = e.error.message;
    } else {
      errorMessage = `Error Code: ${e.status}\nMessage: ${e.message}`;
      errorRes = `${e.error.message} `;
    }
    return throwError(errorRes);
  }
}
