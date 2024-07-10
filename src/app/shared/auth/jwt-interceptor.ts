import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { JWTTokenService } from './jwt-token.service';
import { RefreshTokenResponse } from '../models/auth';
import { HttpResponse } from '../models/response';
import { AuthRequestService } from './auth-request.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(
    private authService: AuthService,
    private authRequestService: AuthRequestService,
    private toastrService: ToastrService,
    private jwtTokenService: JWTTokenService
  ) {}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    let authReq = req;

    const token = this.authService.getToken();

    const tokenExp = this.jwtTokenService.isTokenExpired();


    if (authReq.url.includes('/refresh')){}
    else {
      if(token){
        authReq = this.addTokenHeader(req, token);
      }
    }

    return next?.handle(authReq).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.url.includes('/refresh') && error.status !== 200) {
          this.toastrService.error('Сессия истекла, пожалуйста, авторизуйтесь.');
          this.authService.logout();
        }

        if (tokenExp) {
          return this.handle401Error(authReq, next);
        }
        if (error instanceof HttpErrorResponse && !authReq.url.includes('/login') && error.status === 401) {
          return this.handle401Error(authReq, next);
        }
        return throwError(error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

    if (!this.isRefreshing) {

      this.isRefreshing = true;

      const refreshToken = this.authService.getRefreshToken();

      if (refreshToken){
        return this.authRequestService.refreshToken().pipe(
          switchMap((res: HttpResponse<RefreshTokenResponse>) => {
            if(res.data && res.data.accessToken){
              this.isRefreshing = false;
              this.authService.setACToCookies(res.data.accessToken);
              this.refreshTokenSubject.next(res.data.accessToken);
              return next.handle(this.addTokenHeader(request, JSON.stringify(res.data.accessToken)));
            }else{
            this.toastrService.error('Сессия истекла, пожалуйста, авторизуйтесь.');
            this.authService.logout();
            }
          }),
          catchError((error) => {
            return throwError(error);
          })
        );
      }else{
        this.toastrService.error('Сессия истекла, пожалуйста, авторизуйтесь.');
        this.authService.logout();
      }

    } else {
    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => {
        return next.handle(this.addTokenHeader(request, token)
      )})
    );
      }
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + JSON.parse(token)) });
  }
}
