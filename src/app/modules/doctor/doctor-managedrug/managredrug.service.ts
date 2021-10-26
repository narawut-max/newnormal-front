import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const endpoint = environment.apiEndPoint;

@Injectable({
  providedIn: 'root'
})
export class ManagredrugService {

  constructor(private http: HttpClient) { }

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
  searchTreatByCriteria(billId: any, bkId: any, userHnId: any, userFirstname: any, userLastname: any) {
    let params = new HttpParams();
    if (billId) {
      params = params.append('billId', billId);
    }

    if (bkId) {
      params = params.append('bkId', bkId);
    }

    if (userHnId) {
      params = params.append('userHnId', userHnId);
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

  //update
  updateBilldrugStatus(updateTreat: any): Observable<any> {
    return this.http.post<any>(endpoint + '/billdrugs/update/', JSON.stringify(updateTreat), httpOptions)
  }
  updateTreatmentStatus(updateuser: any): Observable<any> {
    return this.http.post<any>(endpoint + '/treatments/updates/', JSON.stringify(updateuser), httpOptions)
  }
  
  //report
  generateBilldrugReport(billId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/report/generateBilldrugReport?billId=' + billId, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'body',
      responseType: 'blob' as 'json'
    });
  }
  

}//end
