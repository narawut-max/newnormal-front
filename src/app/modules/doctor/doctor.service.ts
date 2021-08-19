import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const endpoint = environment.apiEndPoint;

@Injectable({
  providedIn: 'root'
})

export class DoctorService {

  constructor(private http: HttpClient) { }

  //User
  getAllUsers(): Observable<any> {
    return this.http.get<any>(endpoint + '/users/')
  }
  getUserByUserId(userId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/users/' + userId)
  }

  //Treatment
  getAllTreatment(): Observable<any> {
    return this.http.get<any>(endpoint + '/treatments/')
  }
  getTreatmentByTmId(tmId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/treatments/' + tmId)
  }

  //Booking
  getAllBookings(): Observable<any> {
    return this.http.get<any>(endpoint + '/bookings/')
  }
  getBookingsByBkId(bkId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/bookings/' + bkId)
  }

  //billdrugs
  getAllBilldrugs(): Observable<any> {
    return this.http.get<any>(endpoint + '/billdrugs/')
  }
  getBilldrugByBillId(billId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/billdrugs/' + billId)
  }

  //Address
  getSubdistrictAll(): Observable<any> {
    return this.http.get<any>(endpoint + '/subdistricts')
  }
  getDistrictsAll(): Observable<any> {
    return this.http.get<any>(endpoint + '/districts')
  }
  getProvincesAll(): Observable<any> {
    return this.http.get<any>(endpoint + '/provinces')
  }
  getSubdistrictByZipCode(zipCode: any): Observable<any> {
    return this.http.get<any>(endpoint + '/subdistricts/by-zip-code?zipCode=' + zipCode)
  }

  // HttpClient API put() method => Update employee
  updateDatadoctor(updatedoctor: any): Observable<any> {
    return this.http.post<any>(endpoint + '/users/update/', JSON.stringify(updatedoctor), httpOptions)
  }

}//end
