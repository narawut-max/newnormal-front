import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const endpoint = environment.apiEndPoint;

@Injectable({
  providedIn: 'root'
})
export class AdminRegisterService {

  constructor(private http: HttpClient) { }

  // HttpClient API post() method => Create employee
  createUser(registerData: any): Observable<any> {
    return this.http.post<any>(endpoint + '/users/save', JSON.stringify(registerData), httpOptions)
  }  

  createtmId(registerData: any): Observable<any> {
    return this.http.post<any>(endpoint + '/treatments/save', JSON.stringify(registerData), httpOptions)
  }  

}
