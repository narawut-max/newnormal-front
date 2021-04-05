import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  // tslint:disable-next-line: variable-name
  private _$userType: BehaviorSubject<any> = new BehaviorSubject<any>({});
  constructor() { }
  public get $userType(): Observable<any> {
    return this._$userType.asObservable();
  }
  public set $userType(value: Observable<any>) {
    value.subscribe(data => {
      this._$userType.next(data);
    });
  }
}