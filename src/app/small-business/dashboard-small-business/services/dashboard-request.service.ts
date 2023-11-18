import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class DashboardRequestService {
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
    constructor(
        private http: HttpClient
        ) {}
    
    
    test(): Observable<any> {
        const res =  this.http
          .post(`http://localhost:2300/v1/auth/update-password`, this.httpOptions)
          .pipe(catchError(this.errorHandler));
        return res;
    }


    errorHandler(error) {
        let errorMessage = '';
        let errorRes = '';
        if (error.error instanceof ErrorEvent) {
          errorMessage = error.error.message;
          errorRes = error.error.message;
        } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          errorRes = `${error?.error?.message}  `;
    
           if(error.error.errors?.length>0){
            errorRes = `${error?.error?.errors[0]?.title}  `;
           }
        }
    
        return throwError(errorRes);
      }
}