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
export class AddtreatService {

  constructor(private http: HttpClient) { }

  //get Address
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

  //get User
  getAllUsers(): Observable<any> {
    return this.http.get<any>(endpoint + '/users/')
  }
  getUserByUserId(userId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/users/' + userId)
  }

  //get Treatment
  getAllTreatment(): Observable<any> {
    return this.http.get<any>(endpoint + '/treatments/')
  }
  getTreatmentByTmId(tmId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/treatments/' + tmId)
  }

  //get billdrugs
  getAllBilldrugs(): Observable<any> {
    return this.http.get<any>(endpoint + '/billdrugs/')
  }
  getBilldrugByBillId(billId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/billdrugs/' + billId)
  }

  //get Booking
  getAllBookings(): Observable<any> {
    return this.http.get<any>(endpoint + '/bookings/')
  }
  getBookingsByBkId(bkId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/bookings/' + bkId)
  }

  //Update
  updateTreatment(updateTreat: any): Observable<any> {
    return this.http.post<any>(endpoint + '/treatments/update/', JSON.stringify(updateTreat), httpOptions)
  }

  updateUser(updateTreat: any): Observable<any> {
    return this.http.post<any>(endpoint + '/users/update/', JSON.stringify(updateTreat), httpOptions)
  }

  updatebooking(updateTreat: any): Observable<any> {
    return this.http.post<any>(endpoint + '/bookings/update/', JSON.stringify(updateTreat), httpOptions)
  }

  updateBilldrug(updateTreat: any): Observable<any> {
    return this.http.post<any>(endpoint + '/billdrugs/update/', JSON.stringify(updateTreat), httpOptions)
  }

  //Create
  createBilldrug(registerData: any): Observable<any> {
    return this.http.post<any>(endpoint + '/billdrugs/save', JSON.stringify(registerData), httpOptions)
  }

  createTreatment(registerData: any): Observable<any> {
    return this.http.post<any>(endpoint + '/treatments/save', JSON.stringify(registerData), httpOptions)
  }

}
