import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  // Define API URL
  apiURL = 'http://localhost:9080/newnormal-api';

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  //Treatment
  getAllTreatment(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/treatments/')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  getTreatmentByTmId(tmId: any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/treatments/64001')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Error handling 
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
