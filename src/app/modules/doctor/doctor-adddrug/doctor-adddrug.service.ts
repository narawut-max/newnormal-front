import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const endpoint = environment.apiEndPoint;

@Injectable({
  providedIn: 'root'
})
export class DoctorAdddrugService {

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

  //billdrugs
  getAllBilldrugs(): Observable<any> {
    return this.http.get<any>(endpoint + '/billdrugs/')
  }
  getBilldrugByBillId(billId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/billdrugs/' + billId)
  }

  //Booking
  getAllBookings(): Observable<any> {
    return this.http.get<any>(endpoint + '/bookings/')
  }
  getBookingsByBkId(bkId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/bookings/' + bkId)
  }

  //Drug
  getAllDrugs(): Observable<any> {
    return this.http.get<any>(endpoint + '/drugs/')
  }
  getDrugByDrugId(drugId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/drugs/' + drugId)
  }
  getSearchByDrugName(drugName: any) {
    console.log(drugName);
    return this.http.get<any>(endpoint + '/drugs/search/' + drugName)
  }

  searchDrugByCriteria(drugId: any, drugName: any, drugTrademark: any) {
    let params = new HttpParams();
    if (drugId) {
      params = params.append('drugId', drugId);
    }

    if (drugName) {
      params = params.append('drugName', drugName);
    }

    if (drugTrademark) {
      params = params.append('drugTrademark', drugTrademark);
    }
    console.log('searchDrugByCriteria param :: ' + params);

    return this.http.get<any>(endpoint + '/drugs/search-by-criteria', {params: params})
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
  createBilldrugDetails(drugDetails: any): Observable<any> {
    return this.http.post<any>(endpoint + '/billdrugs-detail/save', JSON.stringify(drugDetails), httpOptions)
  }

  //report
  generateBilldrugReport(billId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/report/generateBilldrugReport?billId='+billId, {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      }),
      observe: 'response' as 'body',
      responseType: 'blob' as 'json'
 });
  } 
  
}//end
