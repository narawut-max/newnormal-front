import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const endpoint = environment.apiEndPoint;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }
  

  getAllBookings():  Observable<any> {
    return this.http.get(endpoint + '/bookings', httpOptions);
  }

  getBilldrugByBillId(bkId: any): Observable<any> {
    return this.http.get(endpoint + '/bookings/'.concat(bkId), httpOptions);
  }


}
