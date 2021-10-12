import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  gettreatBydepartment(userDepartment: any): Observable<any> {
    return this.http.get<any>(endpoint + '/users/by-Department?userDepartment=' + userDepartment)
  }
  getUserByUser(userId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/users/by-userId?userId=' + userId)
  }
  getUserByRoleId(roleId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/users/by-user?roleId=' + roleId)
  }
  getSearchUserByCriteria(userId: any, userHnId: any, userCardId: any, userFirstname: any, userLastname: any) {
    let params = new HttpParams();
    if (userId) {
      params = params.append('userId', userId);
    }

    if (userHnId) {
      params = params.append('userHnId', userHnId);
    }

    if (userCardId) {
      params = params.append('userCardId', userCardId);
    }

    if (userFirstname) {
      params = params.append('userFirstname', userFirstname);
    }

    if (userLastname) {
      params = params.append('userLastname', userLastname);
    }
    console.log('searchTreatByCriteria param :: ' + params);

    return this.http.get<any>(endpoint + '/users/search-by-criteria', { params: params })
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
  searchTreatByCriteria(bkId: any, userHnId: any, userCardId: any, userFirstname: any, userLastname: any) {
    let params = new HttpParams();
    if (bkId) {
      params = params.append('bkId', bkId);
    }

    if (userHnId) {
      params = params.append('userHnId', userHnId);
    }

    if (userCardId) {
      params = params.append('userCardId', userCardId);
    }

    if (userFirstname) {
      params = params.append('userFirstname', userFirstname);
    }

    if (userLastname) {
      params = params.append('userLastname', userLastname);
    }
    console.log('searchTreatByCriteria param :: ' + params);

    return this.http.get<any>(endpoint + '/treatments/search-by-criteria', { params: params })
  }

  //Booking
  getAllBookings(): Observable<any> {
    return this.http.get<any>(endpoint + '/bookings/')
  }
  getBookingsByBkId(bkId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/bookings/' + bkId)
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

  //update
  updateDatadoctor(updatedoctor: any): Observable<any> {
    return this.http.post<any>(endpoint + '/users/update/', JSON.stringify(updatedoctor), httpOptions)
  }

  //report
  generateTreatmentReport(userId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/report/generateTreatmentReport?userId=' + userId, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'body',
      responseType: 'blob' as 'json'
    });
  }

}//end
