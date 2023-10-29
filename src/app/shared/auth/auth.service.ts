import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  private readonly serverUrl = '188.68.220.137:2300'//environment.USERMANAGEMENT;
  constructor( public router: Router, private http: HttpClient) {}

  public signIn(payload: any): Observable<any> {
    return this.http
      .post<any>(`http://188.68.220.137:2300/v1/auth/login`, payload)
      .pipe(catchError((e) => throwError(e)));
  }

  // signupUser(email: string, password: string) {
  // }

  // signinUser(email: string, password: string) {
  //   return Promise.resolve();
  // }

  // logout() {
  //   this.router.navigate(['YOUR_LOGOUT_URL']);
  // }

  // isAuthenticated() {
  //   return true;
  // }
}
