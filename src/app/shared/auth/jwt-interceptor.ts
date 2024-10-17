import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { JWTTokenService } from './jwt-token.service';
import { AuthRequestService } from './auth-request.service';


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

    return next?.handle(authReq).pipe()


    // if (authReq.url.includes('/refresh')){}
    // else {
    //   if(token){
    //     authReq = this.addTokenHeader(req, token);
    //   }
    // }

    // return next?.handle(authReq).pipe(
    //   catchError((error) => {
    //     // if (error instanceof HttpErrorResponse && error.url.includes('/refresh') && error.status !== 200) {
    //     //   this.toastrService.error('Сессия истекла, пожалуйста, авторизуйтесь.');
    //     //   this.authService.logout();
    //     // }

    //     if (tokenExp) {
    //       return this.handle401Error(authReq, next);
    //     }
    //     if (error instanceof HttpErrorResponse && !authReq.url.includes('/login') && error.status === 401) {
    //       return this.handle401Error(authReq, next);
    //     }
    //     return throwError(error);
    //   })
    // );
  }
 

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + JSON.parse(token)) });
  }
}
