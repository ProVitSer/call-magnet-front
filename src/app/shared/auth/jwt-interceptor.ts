import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { JWTTokenService } from './jwt-token.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private jwtTokenService: JWTTokenService
  ) {}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    
    let authReq = req;
    const token = this.authService.getToken();
    const tokenTime = this.jwtTokenService.isTokenExpired();

    if (token != null) {
      authReq = this.addTokenHeader(req, token);
    }
    return next?.handle(authReq).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && !authReq.url.includes('/login') && error.status === 401) {
          return this.handle401Error(authReq, next);
        }
        if (tokenTime) {
          return this.handle401Error(authReq, next);
        }


        return throwError(error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const refreshToken = this.authService.getRefreshToken();
      if (refreshToken){
        // return this.authService.refreshToken(JSON.parse(refreshToken)).pipe(
        //   switchMap((token: RefreshTokenResponse) => {
        //     if(token?.access_token){
        //       this.isRefreshing = false;
        //       this.authService.setSessionCookie(token?.access_token);
        //       this.refreshTokenSubject.next(token?.access_token);
        //       return next.handle(this.addTokenHeader(request, token?.access_token));
        //     }else{
        //     this.toastrService.error('Сессия истекла, пожалуйста, авторизуйтесь.');
        //     this.authService.logout();
        //     }

        //   }),
        //   catchError((err) => {
        //     this.isRefreshing = false;
        //     this.toastrService.error('Сессия истекла, пожалуйста, авторизуйтесь.');
        //     this.authService.logout();
        //     return throwError(err);
        //   })
        // );
      }else{
        this.toastrService.error('Сессия истекла, пожалуйста, авторизуйтесь.');
        this.authService.logout();
      }

    }
    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
  }
}
