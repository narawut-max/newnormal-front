import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const endpoint = environment.apiEndPoint;

@Injectable({
  providedIn: 'root'
})

export class QrPromptpayService {

  constructor(private http: HttpClient) { }

  // generateQRCodeToBase64(): Observable<any> {
  //   return this.http.get<any>(endpoint + '/generate-to-base64/')
  // }

  // generateQRCodeToByteArray(): Observable<any> {
  //   return this.http.get<any>(endpoint + '/generate-to-byte-array/')
  // }

  generateQRCodeToBase64(amount: any): Observable<any> {
    return this.http.get<any>(endpoint + '/promptpay-qr/generate-to-base64?amount=' + amount)
  }

  generateQRCodeToByteArray(amount: any): Observable<any> {
    return this.http.get<any>(endpoint + '/promptpay-qr/generate-to-byte-array?amount=' + amount)
  }

}//end
