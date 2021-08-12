import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { View } from '@syncfusion/ej2-angular-schedule';
import { UserService } from '../user.service';
import { BookingService } from './booking.service';


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
  ) { }
  submitted = false;

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
    const UserId = sessionStorage.getItem('user_id');
    debugger
    this.initUserDataById(UserId);
  }

  initUserDataById(UserId: any) {
    this.userService.getUserByUserId(UserId).subscribe((res) => {
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

  get userf() { return this.DataUserForm.controls; }
}