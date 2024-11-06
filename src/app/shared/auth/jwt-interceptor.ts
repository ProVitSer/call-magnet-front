import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { JWTTokenService } from './jwt-token.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private toastrService: ToastrService,
        private jwtTokenService: JWTTokenService,
    ) {}

    // eslint-disable-next-line @typescript-eslint/ban-types
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
        let authReq = req;

        if (authReq.url.includes('/forgot-password')) {
            return next?.handle(req).pipe(
                catchError((error) => {
                    return throwError(error);
                }),
            );
        } else if (authReq.url.includes('/check-verification-code')) {
            return next?.handle(req).pipe(
                catchError((error) => {
                    return throwError(error);
                }),
            );
        } else if (authReq.url.includes('/login')) {
            /* empty */
        } else if (authReq.url.includes('/reset-password')) {
            return next?.handle(req).pipe(
                catchError((error) => {
                    return throwError(error);
                }),
            );
        } else {
            const token = this.authService.getToken();

            if (!token) {
                this.authService.logout();
            }

            const tokenExp = this.jwtTokenService.isTokenExpired(token);

            if (tokenExp) {
                this.toastrService.error('Сессия истекла, пожалуйста, авторизуйтесь.');
                this.authService.logout();
            }

            if (token) {
                authReq = this.addTokenHeader(req, token);
            }
        }

        return next?.handle(authReq).pipe(
            catchError((error) => {
                return throwError(error);
            }),
        );
    }

    private addTokenHeader(request: HttpRequest<any>, token: string) {
        return request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + JSON.parse(token)) });
    }
}
