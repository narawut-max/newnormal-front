declare let $: any;
import { Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarOptions } from '@fullcalendar/angular';


@Component({
  selector: 'app-user-booking-calender',
  templateUrl: './user-booking-calender.component.html',
  styleUrls: ['user-booking-calender.component.css'],
  // providers: [MonthService, ResizeService, DragAndDropService],
})
export class UserBookingCalenderComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  title = 'angularadmintemplates';
  calendarOptions !: CalendarOptions;

  ngOnInit() {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      dateClick: this.handleDateClick.bind(this),
      events: []
    };
    //Add User form validations
    this.addEventForm = this.formBuilder.group({
      title: ['', [Validators.required]]
    });
  }

  /* Add Event Form */
  addEventForm: any;
  submitted = false;
  //Add user form actions
  get f() { return this.addEventForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid and reset the validations
    this.addEventForm.get('title').setValidators([Validators.required]);
    this.addEventForm.get('title').updateValueAndValidity();
    if (this.addEventForm.invalid) {
      return;
    }
  }

  //Show Modal with Forn on dayClick Event
  handleDateClick(arg: any) {
    $("#myModal").modal("show");
    $(".modal-title, .eventstarttitle").text("");
    $(".modal-title").text("Add Event at : " + arg.dateStr);
    $(".eventstarttitle").text(arg.dateStr);

  }
  
  //Hide Modal PopUp and clear the form validations
  hideForm() {
    this.addEventForm.patchValue({ title: "" });
    this.addEventForm.get('title').clearValidators();
    this.addEventForm.get('title').updateValueAndValidity();
  }
}
