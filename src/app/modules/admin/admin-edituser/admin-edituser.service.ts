import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const endpoint = environment.apiEndPoint;

@Injectable({
  providedIn: 'root'
})
export class AdminEdituserService {

  constructor(private http: HttpClient) { }

  getAllUser(): Observable<any> {
    return this.http.get<any>(endpoint + '/users/')
  }

  getUserById(userId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/users/' + userId)
  }


  // HttpClient API put() method => Update employee
  updateDatauser(updateuser: any): Observable<any> {
    return this.http.post<any>(endpoint + '/users/update/', JSON.stringify(updateuser), httpOptions)
  }
}
