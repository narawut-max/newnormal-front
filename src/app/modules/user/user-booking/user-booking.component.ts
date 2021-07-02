import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-booking',
  template: '<ejs-schedule></ejs-schedule>',
  templateUrl: './user-booking.component.html',
  styleUrls: ['./user-booking.component.css']
})
export class UserBookingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}