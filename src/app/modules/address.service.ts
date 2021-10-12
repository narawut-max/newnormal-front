import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const endpoint = environment.apiEndPoint;

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  getProvincesAll(): Observable<any> {
    return this.http.get<any>(endpoint + '/provinces')
  }

  getDistrictsAll(): Observable<any> {
    return this.http.get<any>(endpoint + '/districts')
  }

  getSubdistrictAll(): Observable<any> {
    return this.http.get<any>(endpoint + '/subdistricts')
  }

  getsubdistrictsByZipCode(zipCode: any): Observable<any> {
    return this.http.get<any>(endpoint + '/subdistricts/by_zip_code?zipCode=' + zipCode)
  }

  getsubdistrictsByZipCode1(zipCode: any): Observable<any> {
    return this.http.get<any>(endpoint + '/subdistricts/zipCode?zipCode=' + zipCode)
  }

  getsubdistrictsBySdtId(subdistricts: any): Observable<any> {
    return this.http.get<any>(endpoint + '/subdistricts/sdtId?sdtId=' + subdistricts)
  }
  
}//end
