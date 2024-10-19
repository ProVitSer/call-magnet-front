import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { JWTTokenService } from './jwt-token.service';
import { AuthRequestService } from './auth-request.service';
import { catchError } from 'rxjs/operators';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
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

    if (tokenExp) {
        this.toastrService.error('Сессия истекла, пожалуйста, авторизуйтесь.');
        this.authService.logout();
    }

    return next?.handle(authReq).pipe(
        catchError((error) => {
            return throwError(error);
        })
    )

  }
 

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + JSON.parse(token)) });
  }
}
