import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  MonthService, View, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-user-booking-calender',
  templateUrl: './user-booking-calender.component.html',
  styleUrls: ['user-booking-calender.component.css'],
  providers: [MonthService, ResizeService, DragAndDropService],
  encapsulation: ViewEncapsulation.None
})
export class UserBookingCalenderComponent implements OnInit {


  public currentView: View = 'Month';
  // public selectedDate: Date = new Date(2017, 11, 15);

  constructor() {
  }

  ngOnInit(): void {
  }

  getCellContent(date: Date): string {
    if (date.getMonth() === 10 && date.getDate() === 23) {
      return '<img src="./assets/schedule/images/thanksgiving-day.svg" /><div class="caption">Thanksgiving day</div>';
    } else if (date.getMonth() === 11 && date.getDate() === 9) {
      return '<img src="./assets/schedule/images/get-together.svg" /><div class="caption">Party time</div>';
    }
    return '';
  }

}
