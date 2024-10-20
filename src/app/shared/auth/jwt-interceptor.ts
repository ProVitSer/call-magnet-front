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
    private jwtTokenService: JWTTokenService
  ) {}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    
    let authReq = req;

    if (authReq.url.includes('/login')){}
    else if (authReq.url.includes('/refresh')){}
    else {
      
        const token = this.authService.getToken();

        if (!token) {
            this.authService.logout();
        }

        const tokenExp = this.jwtTokenService.isTokenExpired(token);

        if (tokenExp) {
            this.toastrService.error('Сессия истекла, пожалуйста, авторизуйтесь.');
            this.authService.logout();
        }      


        if(token){
            authReq = this.addTokenHeader(req, token);
        }
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
