import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminEditadminService {
  
  constructor(private http: HttpClient) { }

  // Define API URL
  apiURL = 'http://localhost:9080/newnormal-api';

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getAllUser(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/users/')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getUserById(userId: any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/users/' + userId)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getSubdistrictAll(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/subdistricts')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getDistrictsAll(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/districts')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getProvincesAll(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/provinces')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getSubdistrictByZipCode(zipCode: any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/subdistricts/by-zip-code?zipCode=' + zipCode)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

    // HttpClient API put() method => Update employee
    updateDatadoctor(updatedoctor: any): Observable<any> {
      return this.http.post<any>(this.apiURL + '/users/update/', JSON.stringify(updatedoctor), this.httpOptions)
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
