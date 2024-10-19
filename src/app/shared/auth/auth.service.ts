import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SetsCookiesData, EncryptedUserData, TokenPayload } from '../models/auth';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from './encr-decr.service';
import { RouteInfo } from '../vertical-menu/vertical-menu.metadata';
import { UserData } from '../models/user';
import { jwtDecode } from "jwt-decode";

@Injectable()
export class AuthService {
  private static projectKey = 'pac';
  private menuData = 'menu';
  private authUserInfoKey = 'AUTH-UI';
  private accessTokenKey = 'AUTH-AC';

  constructor( 
    public router: Router, 
    private cookieService: CookieService,
    private EncrDecr: EncrDecrService
    ) {}


  public setCookies(data: SetsCookiesData): boolean {

    const encryptedClient: string = this.encryptedUserData(data);

    const encryptedAccessToken: string = btoa(JSON.stringify(data.accessToken));

    if(encryptedClient && encryptedAccessToken){
      this.cookieService.set(AuthService.projectKey + '-' +  this.authUserInfoKey, encryptedClient,1,'/');
      this.cookieService.set(AuthService.projectKey + '-' + this.accessTokenKey, encryptedAccessToken,1,'/');

      return true;
    }
    return false;
  }

  private encryptedUserData(data: EncryptedUserData){

    const client = {
      clientId: data.clientId,
      userId: data.userId,
      firstname: data.firstname,
      lastname: data.lastname,
      company: data.company
    }

    return btoa(unescape(encodeURIComponent(JSON.stringify(client))));
  }

  public setACToCookies(token: string){

    const encryptedAccessToken: string = btoa(JSON.stringify(token));

    this.cookieService.set(AuthService.projectKey + '-' + this.accessTokenKey, encryptedAccessToken,1,'/');

  }
 
  
  public getToken(): string | null {

    const accessToken = atob(this.cookieService.get(`${AuthService.projectKey}-${this.accessTokenKey}`));

    if (accessToken !== "") {

      return accessToken;

    }

    return null;
  }

  public getTokenData(): TokenPayload | null {

    const accessToken = atob(this.cookieService.get(`${AuthService.projectKey}-${this.accessTokenKey}`));

    if (accessToken !== "") {

      return jwtDecode(accessToken) as TokenPayload;


    }

    return null;
  }

  public getUser(): UserData {

    const getUser = decodeURIComponent(escape(atob(this.cookieService.get(`${AuthService.projectKey}-${this.authUserInfoKey}`))));

    if (getUser !== "") {

      const user = JSON.parse(getUser);

      if (user) {

        return user;

      }

    }

    return null;
  }

  public updateUserData(data: EncryptedUserData){

    const user = this.getUser();

    if(user == null) return;

    this.cookieService.delete(`${AuthService.projectKey}-${this.authUserInfoKey}`, '/');

    const encryptedClient: string = this.encryptedUserData({
      clientId:  user.clientId,
      userId: data.userId,
      firstname: data.firstname,
      lastname: data.lastname,
      company: data.company
    });

    this.cookieService.set(AuthService.projectKey + '-' + this.authUserInfoKey, encryptedClient,1,'/');

  }

  public setMenu(menu: RouteInfo[]): void {

    if (menu) {

      localStorage.setItem(this.menuData, this.EncrDecr.encryptUsingAES256(menu));

    }

  }

  public getMenu(): RouteInfo[] {

    if(localStorage.getItem(this.menuData)){

      const DECRYPT_DATA = this.EncrDecr.decryptUsingAES256(localStorage.getItem(this.menuData));

      const MENU = JSON.parse(DECRYPT_DATA);

      if (MENU) {
        return MENU;
      }
    }else{
      return [];
    }
  }

  public isUserLoggedIn(): boolean {

    const ac = atob(this.cookieService.get(`${AuthService.projectKey}-${this.accessTokenKey}`));

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
}
