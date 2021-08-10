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
    tmId: ['', Validators.required],
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
    user: {
      userId: [0],
      userUsername: ['', Validators.required],
      userPassword: ['', Validators.required],
      userCardId: ['', Validators.required],
      userTitle: ['', Validators.required],
      userFirstname: ['', Validators.required],
      userLastname: ['', Validators.required],
      userGender: ['', Validators.required],
      userBirthday: ['', Validators.required],
      userBlood: [''],
      userPhone: [''],
      userEmail: [''],
      userDisease: [''],
      userAddrass: [''],
      userAllergy: [''],
      roleId: ['2'],
    },
    booking: {
      bkId: [0],
      bkQueue: ['', Validators.required],
      bkDate: ['', Validators.required],
      bkTime: ['', Validators.required],
      bkSymptom: ['', Validators.required],
      bkProcess: [''],
    }
  });

  ngOnInit(): void {
    const tmId = sessionStorage.getItem('user_tmId');
    debugger
    this.initUserDataforEditById(tmId);
  }

  initUserDataforEditById(tmId: any) {
    this.userService.getTreatmentByTmId(tmId).subscribe((res) => {
      console.log('!!!!!!!!!!!!res data!!!!!!!!!!!!', res)
      this.DataUserForm.patchValue({
        tmId: res.tmId,
        tmDate: res.tmDate,
        tmTime: res.tmTime,
        tmMoney: res.tmMoney,
        tmSlip: res.tmSlip,
        tmStatus: res.tmStatus,
        bkId: res.bkId,
        userId: res.userId,
        userCardId: res.user.userCardId,
        userUsername: res.user.userUsername,
        userPassword: res.user.userPassword,
        userTitle: res.user.userTitle,
        userFirstname: res.user.userFirstname,
        userLastname: res.user.userLastname,
        userGender: res.user.userGender,
        userBirthday: res.user.userBirthday,
        userBlood: res.user.userBlood,
        userPhone: res.user.userPhone,
        userEmail: res.user.userEmail,
        userDisease: res.user.userDisease,
        userAddrass: res.user.userAddrass,
        userAllergy: res.user.userAllergy,
        roleId: res.user.roleId,
        bkQueue: res.booking.bkQueue,
        bkDate: res.booking.bkDate,
        bkTime: res.booking.bkTime,
        bkSymptom: res.booking.bkSymptom,
        bkProcess: res.booking.bkProcess,
      });
    },
      (error) => {
        console.log('!!!!!!!!!!!!!!error!!!!!!!!!!', error);
      }
    );
  }

  get userf() { return this.DataUserForm.controls; }
}