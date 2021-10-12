import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const endpoint = environment.apiEndPoint;

@Injectable({
  providedIn: 'root'
})
export class UserService {

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
  gettreatmentsByUserId(userId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/treatments/by-user?userId=' + userId)
  }

  //Booking
  getAllBookings(): Observable<any> {
    return this.http.get<any>(endpoint + '/bookings/')
  }
  getBookingsByBkId(bkId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/bookings/' + bkId)
  }
  getbookingsByUserId(userId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/bookings/by-user?userId=' + userId)
  }
  getbookingBydepartment(bkDepartment: any): Observable<any> {
    return this.http.get<any>(endpoint + '/bookings/by-Department?bkDepartment=' + bkDepartment)
  }

  //billdrugs
  getAllBilldrugs(): Observable<any> {
    return this.http.get<any>(endpoint + '/billdrugs/')
  }
  getBilldrugByBillId(billId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/billdrugs/' + billId)
  }

  getSubdistrictBySdtId(district: any): Observable<any> {
    return this.http.get<any>(endpoint + '/subdistricts/sdtId?sdtId=' + district)
  }

  //update
  updateDatauser(updateuser: any): Observable<any> {
    return this.http.post<any>(endpoint + '/users/update/', JSON.stringify(updateuser), httpOptions)
  }
  updateTreatments(updateuser: any): Observable<any> {
    return this.http.post<any>(endpoint + '/treatments/update/', JSON.stringify(updateuser), httpOptions)
  }
  updateTreatmentStatus(updateuser: any): Observable<any> {
    return this.http.post<any>(endpoint + '/treatments/updates/', JSON.stringify(updateuser), httpOptions)
  }

  updatebooking(updateTreat: any): Observable<any> {
    return this.http.post<any>(endpoint + '/bookings/update/', JSON.stringify(updateTreat), httpOptions)
  }
  updateBookingStatus(updateTreat: any): Observable<any> {
    return this.http.post<any>(endpoint + '/bookings/updates/', JSON.stringify(updateTreat), httpOptions)
  }

  updateBookingStatusByBkId(bkId: any, bkStatus: any): Observable<any> {
    return this.http.post<any>(endpoint + '/bookings/update-bk-status/' + bkId + '?bkStatus='+bkStatus, httpOptions)
  }

  // create
  createBooking(saveBooking: any): Observable<any> {
    return this.http.post<any>(endpoint + '/bookings/save', JSON.stringify(saveBooking), httpOptions)
  } 
  
  // ******** upload ************
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${endpoint}/uploads`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${endpoint}/files`);
  }
  
}//end
