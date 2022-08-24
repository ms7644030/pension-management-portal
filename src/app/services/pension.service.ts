import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenstorageService } from 'src/app/services/tokenstorage.service';

import { catchError, Observable, throwError } from 'rxjs';
import { PensionerDetails } from 'src/app/models/PensionerDetails';
import { PensionDetail } from 'src/app/models/PensionDetail';
import { Aadhaar } from '../models/Aadhaar';

const TOKEN_KEY = 'auth-token';

let token = 'Bearer ' + window.sessionStorage.getItem(TOKEN_KEY);

// let httpOptions = new HttpHeaders();
// httpOptions = httpOptions.set('Authorization', 'Bearer ' + token);

// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: token,
//   }),
// };

@Injectable({
  providedIn: 'root',
})
export class PensionService {
  private serverUrl: string = `http://pension-m-portal-lb-1287567267.us-west-2.elb.amazonaws.com`; // pensionerDetail url

  // private serverUrl1: string = `http://localhost:8081`; // pensionDetail url
  // tokenservice = new TokenstorageService();
  // token = this.tokenservice.getToken();

  constructor(private http: HttpClient, private router: Router) {}

  //get pensionerDetails

  public getPensionerDetails(
    aadhaar: number,
    jwt: string
  ): Observable<PensionerDetails | String> {
    let jwttoken = 'Bearer ' + jwt;
    let dataURL: string = `${this.serverUrl}/api/pensioner-detail-service/pensionerDetail/${aadhaar}`;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: jwttoken,
      }),
    };

    return this.http
      .get<PensionerDetails | String>(dataURL, httpOptions)
      .pipe(catchError(this.handleError));
  }

  //get pensionDetail

  public getPensionDetail(
    aadhaar: Aadhaar,
    jwt: string
  ): Observable<PensionDetail> {
    let dataURL: string = `${this.serverUrl}/api/process-pension-service/processPension/aadhaar`;
    let jwttoken = 'Bearer ' + jwt;
    console.log(jwttoken);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: jwttoken,
      }),
    };

    return this.http
      .post<PensionDetail>(dataURL, aadhaar, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Create pensionerDetail

  public createPensioner(
    pensioner: PensionerDetails,
    jwt: string
  ): Observable<PensionerDetails> {
    let dataURL: string = `${this.serverUrl}/api/pensioner-detail-service/pensionerDetail/save`;
    let jwttoken = 'Bearer ' + jwt;
    console.log(jwttoken);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: jwttoken,
      }),
    };

    return this.http
      .post<PensionerDetails>(dataURL, pensioner, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Error handling

  public handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      //client error

      errorMessage = `Error : ${error.error.message}`;
    } else {
      //server error

      if (error.status.valueOf() === 417) {
        errorMessage = 'Invalid Aadhaar, please provide valid Aadhaar';
      } else if (error.status.valueOf() === 400) {
        alert('Session Expired!');

        this.router.navigate(['/pensioner/login']).then();
      }

      //errorMessage = `Status : ${error.status} \n Message :${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
