import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { JwtToken } from '../models/JwtToken';

const AUTH_API =
  'http://pension-m-portal-lb-1287567267.us-west-2.elb.amazonaws.com/api/authorization-service/authenticate';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<JwtToken> {
    return this.http
      .post<JwtToken>(
        AUTH_API,
        {
          username,
          password,
        },
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  public handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      //client error

      errorMessage = `Error : ${error.error.message}`;
    } else {
      //server error

      // if (error.status.valueOf() === 400) {
      //   errorMessage = 'Invalid Aadhaar';
      // }

      errorMessage = `Status : ${error.status} \n Message :${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
