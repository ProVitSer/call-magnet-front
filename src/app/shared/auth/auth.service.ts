import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { LoginModel, LoginResponse, UserData } from '../models/login';
import { HttpResponse } from '../models/response';
import { RefreshTokenResponse, RegisterUserData, RegisterUserResponse, SetsCookiesData, VerifyUserResponse } from '../models/auth';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from './encr-decr.service';
import { RouteInfo } from '../vertical-menu/vertical-menu.metadata';
const MENU_DATA = 'menu';

@Injectable()
export class AuthService {
  private static projectKey = 'call-magnet';
  private readonly serverUrl = environment.API_GATEWAY_URL;
  constructor( 
    public router: Router, 
    private http: HttpClient,
    private cookieService: CookieService,
    private EncrDecr: EncrDecrService
    ) {}

  public signIn(payload: LoginModel): Observable<HttpResponse<LoginResponse>> {
    return this.http
      .post<HttpResponse<LoginResponse>>(`${this.serverUrl}auth/login`, payload)
      .pipe(catchError(this.errorHandler));
  }

  public refreshToken(): Observable<HttpResponse<RefreshTokenResponse>> {
    return this.http
      .get<HttpResponse<LoginResponse>>(`${this.serverUrl}auth/refresh`,  { headers: {
        'Authorization': 'Bearer ' + JSON.parse(this.getRefreshToken())
      } })
      .pipe(catchError(this.errorHandler));
  }

  public register(data: RegisterUserData): Observable<HttpResponse<RegisterUserResponse>> {
    return this.http
      .post<HttpResponse<RegisterUserResponse>>(`${this.serverUrl}auth/register`, data)
      .pipe(catchError(this.errorHandler));
  }

  public verify(verifyId: string): Observable<HttpResponse<VerifyUserResponse>> {
    return this.http
      .post<HttpResponse<VerifyUserResponse>>(`${this.serverUrl}auth/verify-user`, { token: verifyId})
      .pipe(catchError(this.errorHandler));
  }


  public setCookies(data: SetsCookiesData): boolean {

    const encryptedClient: string = btoa(JSON.stringify({ clientId: data.clientId}));
    const encryptedAccessToken: string = btoa(JSON.stringify(data.accessToken));
    const encryptedRefreshToken: string = btoa(JSON.stringify(data.refreshToken));
    const encryptedRole: string = btoa(JSON.stringify({ userRoles: data.userRoles }));

    if(encryptedClient && encryptedAccessToken && encryptedRefreshToken){
      this.cookieService.set(AuthService.projectKey + '-' + 'AUTH-C', encryptedClient,1,'/');
      this.cookieService.set(AuthService.projectKey + '-' + 'AUTH-AC', encryptedAccessToken,1,'/');
      this.cookieService.set(AuthService.projectKey + '-' + 'AUTH-RT', encryptedRefreshToken,1,'/');
      this.cookieService.set(AuthService.projectKey + '-' + 'AUTH-R', encryptedRole,1,'/');

      return true;
    }
    return false;
  }

  public setACToCookies(token: string){
    const encryptedAccessToken: string = btoa(JSON.stringify(token));
    this.cookieService.set(AuthService.projectKey + '-' + 'AUTH-AC', encryptedAccessToken,1,'/');

  }

  public getRefreshToken(): string | null  {
    const refreshToken = atob(this.cookieService.get(`${AuthService.projectKey}-AUTH-RT`));
    if (refreshToken !== "") {
      return refreshToken;
    }
    return null;
  }
  
  
  public getToken(): string | null {
    const accessToken = atob(this.cookieService.get(`${AuthService.projectKey}-AUTH-AC`));
    if (accessToken !== "") {
      return accessToken;
    }
    return null;
  }

  public getUser(): UserData {
    const getUser = atob(this.cookieService.get(`${AuthService.projectKey}-AUTH-U`));
    if (getUser !== "") {
      const user = JSON.parse(getUser);
      if (user) {
        return user.clientId;
      }
    }
    return null;
  }

  public getUserRole(): string[] {
    const data = atob(this.cookieService.get(`${AuthService.projectKey}-AUTH-R`));
    if (data !== "") {
      const user: UserData = JSON.parse(data);
      if (!user.userRoles) {
        return null;
      }
      return user.userRoles;
    }
    return null;
  }

  public setMenu(menu: RouteInfo[]): void {
    if (menu) {
      localStorage.setItem(MENU_DATA, this.EncrDecr.encryptUsingAES256(menu));
    }
  }

  public getMenu(): RouteInfo[] {
    if(localStorage.getItem(MENU_DATA)){
      const DECRYPT_DATA = this.EncrDecr.decryptUsingAES256(localStorage.getItem(MENU_DATA));
      const MENU = JSON.parse(DECRYPT_DATA);

      if (MENU) {
        return MENU;
      }
    }else{
      return [];
    }
  }

  public isUserLoggedIn(): boolean {
    const ac = atob(this.cookieService.get(`${AuthService.projectKey}-AUTH-AC`));
    if (ac !== "") {
      return true;
    } else {
      return false;
    }
  }

  public logout(): void {
    this.cookieService.deleteAll('/');
    localStorage.clear();
    this.router.navigate(['/login']);
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
