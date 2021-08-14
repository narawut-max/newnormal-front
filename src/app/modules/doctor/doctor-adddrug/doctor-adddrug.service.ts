import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DoctorAdddrugService {

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
    return this.http.get<any>(this.apiURL + '/users/6')
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

  //Drug
  getAllDrugs(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/drugs/')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  getDrugByDrugId(drugId: any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/drugs/' + drugId)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  //Update
  updateTreatment(updateTreat: any): Observable<any> {
    return this.http.post<any>(this.apiURL + '/treatments/update/', JSON.stringify(updateTreat), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  updateUser(updateTreat: any): Observable<any> {
    return this.http.post<any>(this.apiURL + '/users/update/', JSON.stringify(updateTreat), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  updatebooking(updateTreat: any): Observable<any> {
    return this.http.post<any>(this.apiURL + '/bookings/update/', JSON.stringify(updateTreat), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  updateBilldrug(updateTreat: any): Observable<any> {
    return this.http.post<any>(this.apiURL + '/billdrugs/update/', JSON.stringify(updateTreat), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  //Create
  createBilldrug(registerData: any): Observable<any> {
    return this.http.post<any>(this.apiURL + '/billdrugs/save', JSON.stringify(registerData), this.httpOptions)
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
