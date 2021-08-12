import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const endpoint = environment.apiEndPoint;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  // Define API URL
  apiURL = 'http://localhost:9080/newnormal-api';

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  //User
  getAllUsers(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/users/')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  getUserByUserId(userId: any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/users/' + userId)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
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
    return this.http.get<any>(this.apiURL + '/treatments/' + tmId)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  //Booking
  getAllBookings(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/bookings/')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  getBookingsByBkId(bkId: any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/bookings/' + bkId)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  //billdrugs
  getAllBilldrugs(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/billdrugs/')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  getBilldrugByBillId(billId: any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/billdrugs/' + billId)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  //Address
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

}//end
