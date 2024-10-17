import { Injectable } from "@angular/core";
import { environment } from 'environments/environment';
import { ChangePasswordData, ChangePasswordResponse, UpdateClientInfoData, UpdateClientInfoResponse } from "../models/client-info";
import { HttpResponse } from "app/shared/models/response";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root',
  })

export class UserProfileService {
    userProfile_url = `${environment.API_GATEWAY_URL}user`;

  constructor(    
    public router: Router, 
    private http: HttpClient
   ) {}


    // public getClientInfo(): Observable<HttpResponse<ClientInfoResponse>> {
    //   return this.http
    //     .get<HttpResponse<ClientInfoResponse>>(`${this.userProfile_url}/client-info`)
    //     .pipe(catchError(this.errorHandler));
    // }

    public updateClientInfo(data: UpdateClientInfoData): Observable<HttpResponse<UpdateClientInfoResponse>> {
      return this.http
        .put<HttpResponse<UpdateClientInfoResponse>>(`${this.userProfile_url}/update-client-info`, data)
        .pipe(catchError(this.errorHandler));
    }

    
    public changePassword(data: ChangePasswordData): Observable<HttpResponse<ChangePasswordResponse>> {
      return this.http
        .put<HttpResponse<ChangePasswordResponse>>(`${this.userProfile_url}/change-password`, data)
        .pipe(catchError(this.errorHandler));
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