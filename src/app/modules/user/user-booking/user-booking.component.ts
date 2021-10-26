import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { View } from '@syncfusion/ej2-angular-schedule';
import Swal from 'sweetalert2';
import { UserService } from '../user.service';
import { BookingService } from './booking.service';

declare let $: any;

@Component({
  selector: 'app-user-booking',
  template: '<ejs-schedule [currentView]="setView"></ejs-schedule>',
  templateUrl: './user-booking.component.html',
  styleUrls: ['./user-booking.component.css']
})
export class UserBookingComponent implements OnInit {

  // public setView: View = 'Month';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
  }

  submitted = false;

  // title = 'angularadmintemplates';
  calendarOptions !: CalendarOptions;

  userId: any
  item: any
  addEventForm: any;
  user_id_param: any
  departments: any = ['หู,คอ,จมูก', 'ศัลยกรรมกระดูก']
  bk_Time: any = ['08:30', '08:45', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',]
  bk_Time2: any = ['13:00', '13:30', '14:00', '14:30', '15:00', '15:30']

  // tmId: any
  DataUserForm = this.fb.group({
    tmId: [0],
    tmDate: ['', Validators.required],
    tmTime: ['', Validators.required],
    tmMoney: ['', Validators.required],
    tmSlip: ['', Validators.required],
    tmStatus: ['', Validators.required],
    billId: [0],
    bkId: [0],
    userId: [0],
    userUsername: ['', Validators.required],
    userPassword: ['', Validators.required],
    userCardId: ['', Validators.required],
    userHnId: [''],
    userTitle: ['', Validators.required],
    userFirstname: ['', Validators.required],
    userLastname: ['', Validators.required],
    userGender: ['', Validators.required],
    userBirthday: ['', Validators.required],
    userBlood: [''],
    userPhone: [''],
    userEmail: ['', Validators.required],
    userDisease: [''],
    userDepartment: [''],
    userAddrass: [''],
    userAllergy: [''],
    roleId: ['2'],
    bkQueue: ['', Validators.required],
    bkDate: ['', Validators.required],
    bkTime: ['', Validators.required],
    bkSymptom: ['', Validators.required],
    bkProcess: [''],
    user: {},
    booking: {}
  });

  ngOnInit(): void {
    const userId = sessionStorage.getItem('user_id');
    this.initUserDataById(userId);
    this.userId = this.user_id_param

    this.calendarOptions = {
      initialView: 'dayGridMonth',
      dateClick: this.handleDateClick.bind(this),
      events: []
    };

    //Add User form validations
    this.addEventForm = this.fb.group({
      bkId: [0],
      bkQueue: [0],
      userId: userId,
      bkDate: [''],
      bkTime: ['', [Validators.required]],
      bkSymptom: [''],
      bkDepartment: [''],
      bkStatus: [''],
      user: {}
    });
  }

  initUserDataById(userId: any) {
    this.userService.getUserByUserId(userId).subscribe((res) => {
      console.log('!!!!!!!!!!!!res data!!!!!!!!!!!!', res)
      this.DataUserForm.patchValue({
        userId: res.userId,
        userCardId: res.userCardId,
        userHnId: res.userHnId,
        userUsername: res.userUsername,
        userPassword: res.userPassword,
        userTitle: res.userTitle,
        userFirstname: res.userFirstname,
        userLastname: res.userLastname,
        userGender: res.userGender,
        userBirthday: res.userBirthday,
        userBlood: res.userBlood,
        userPhone: res.userPhone,
        userEmail: res.userEmail,
        userDisease: res.userDisease,
        userDepartment: res.userDepartment,
        userAddrass: res.userAddrass,
        userAllergy: res.userAllergy,
        roleId: res.roleId,
      });
    },
      (error) => {
        console.log('!!!!!!!!!!!!!!error!!!!!!!!!!', error);
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    console.log('data :', this.addEventForm.value)
    // stop here if form is invalid
    if (this.addEventForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
        text: 'Something went wrong!',
      })
      return;
    } else {
      Swal.fire({
        title: 'ยืนยันการทำรายการ',
        text: "ต้องการบันทึกข้อมูลหรือไม่ ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#198754',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.createBooking(this.addEventForm.value).subscribe(res => {
            console.log('Create Booking res : ', res)
          });
          Swal.fire({
            icon: 'success',
            title: 'บันทึกข้อมูลสำเร็จ',
            text: '',
            confirmButtonText: 'ปิดหน้าต่าง',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
              this.router.navigate(['user/managedata-booking']);
            } else if (result.isDismissed) {
              window.location.reload()

            }
          })
        }
      })
    }
  }

  //Show Modal with Forn on dayClick Event
  handleDateClick(arg: any) {
    this.addEventForm.patchValue({
      bkDate: arg.dateStr
    });

    $("#myModal").modal("show");
    $(".modal-title, .eventstarttitle").text("");
    $(".modal-title").text("จองคิวเข้ารักษาวันที่ : " + arg.dateStr);
    $(".eventstarttitle").text(arg.dateStr);

  }

  //Hide Modal PopUp and clear the form validations
  hideForm() {
    this.addEventForm.patchValue({ title: "" });
    this.addEventForm.get('title').clearValidators();
    this.addEventForm.get('title').updateValueAndValidity();
  }

  changeUserDepartment(event: any) {
    const bkDepartment = event.target.value;
    console.log('bkDepartment' + bkDepartment)
    this.userService.getbookingBydepartment(bkDepartment).subscribe(
      res => {
        console.log(res)
        if (res) {
          this.addEventForm.patchValue(
            {
              departments: res.bkDepartment
            }
          )
        }
      },
      error => {
        this.addEventForm.patchValue(
          {
            departments: ''
          }
        )
      }
    );
  }

  //Add user form actions
  get f() { return this.addEventForm.controls; }
  get userf() { return this.DataUserForm.controls; }
}