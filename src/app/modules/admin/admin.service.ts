import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const endpoint = environment.apiEndPoint;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  //User
  getAllUsers(): Observable<any> {
    return this.http.get(endpoint + '/users', httpOptions);
  }
  getUserByUserId(userId: any): Observable<any> {
    return this.http.get(endpoint + '/users/'.concat(userId), httpOptions);
  }
  deleteUserByUserId(userId: any): Observable<any> {
    return this.http.delete(endpoint + '/users/'.concat(userId),
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'text'
      }
    );
  }

  //Treatment
  getAllTreatment(): Observable<any> {
    return this.http.get(endpoint + '/treatments', httpOptions);
  }
  getTreatmentByTmId(tmId: any): Observable<any> {
    return this.http.get(endpoint + '/treatments/'.concat(tmId), httpOptions);
  }


  // Update
  updateDataAdmin(updateadmin: any): Observable<any> {
    return this.http.post<any>(endpoint + '/users/update/', JSON.stringify(updateadmin), httpOptions)
  }
  
}//end
