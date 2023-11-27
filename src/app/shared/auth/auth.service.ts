import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { LoginModel, LoginResponse, UserData, UserRoles } from '../models/login';
import { HttpResponse } from '../models/response';
import { BaseAuthResponse, ForogtPasswordData, ForogtPasswordResponse, RefreshTokenResponse, RegisterUserData, RegisterUserResponse, SetsCookiesData, VerificationCodeResponse, 
  VerifyUserResponse, ResetPasswordData, UpdateUserData, EncryptedUserData} from '../models/auth';
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

  public setCookies(data: SetsCookiesData): boolean {

    const encryptedClient: string = this.encryptedUserData(data);

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

  private encryptedUserData(data: EncryptedUserData){
    const client = {
      clientId: data.clientId,
      firstname: data.firstname,
      lastname: data.lastname,
      company: data.company,
    }
    return btoa(unescape(encodeURIComponent(JSON.stringify(client))));
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
    const getUser = decodeURIComponent(escape(atob(this.cookieService.get(`${AuthService.projectKey}-AUTH-C`))));
    if (getUser !== "") {
      const user = JSON.parse(getUser);
      if (user) {
        return user;
      }
    }
    return null;
  }

  public updateUserData(data: UpdateUserData){
    const user = this.getUser();
    if(user == null) return;

    this.cookieService.delete(`${AuthService.projectKey}-AUTH-C`, '/');

    const encryptedClient: string = this.encryptedUserData({
      clientId: user.clientId,
      firstname: data.firstname,
      lastname: data.lastname,
      company: data.company
    });
    
    this.cookieService.set(AuthService.projectKey + '-' + 'AUTH-C', encryptedClient,1,'/');

  }

  public getUserRole(): string[] {
    const data = atob(this.cookieService.get(`${AuthService.projectKey}-AUTH-R`));
    if (data !== "") {
      const roles: UserRoles = JSON.parse(data);
      if (!roles.userRoles) {
        return null;
      }
      return roles.userRoles;
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
