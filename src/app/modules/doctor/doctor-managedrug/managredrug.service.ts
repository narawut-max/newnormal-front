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

}//end
