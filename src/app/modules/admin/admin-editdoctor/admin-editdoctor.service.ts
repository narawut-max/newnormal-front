import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const endpoint = environment.apiEndPoint;

@Injectable({
  providedIn: 'root'
})
export class AdminEditdoctorService {
  
  constructor(private http: HttpClient) { }

  getAllUser(): Observable<any> {
    return this.http.get<any>(endpoint + '/users/')
  }

  getUserById(userId: any): Observable<any> {
    return this.http.get<any>( + '/users/' + userId)
  }

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

}
