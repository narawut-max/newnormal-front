import { Component, OnInit } from '@angular/core';
import { View } from '@syncfusion/ej2-angular-schedule';


@Component({
  selector: 'app-user-booking',
  template: '<ejs-schedule [currentView]="setView"></ejs-schedule>',
  templateUrl: './user-booking.component.html',
  styleUrls: ['./user-booking.component.css']
})
export class UserBookingComponent implements OnInit {

  // public setView: View = 'Month';
  constructor() { }

  ngOnInit(): void {
  }

}