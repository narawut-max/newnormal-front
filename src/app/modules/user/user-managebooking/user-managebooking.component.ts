import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-managebooking',
  templateUrl: './user-managebooking.component.html',
  styleUrls: ['./user-managebooking.component.css']
})
export class UserManagebookingComponent implements OnInit {

  formValue !: FormGroup;
  listDatauser !: any;
  item: any
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  listDatausers = this.fb.group({
    tmId: [''],
    tmDate: [''],
    tmTime: [''],
    tmMoney: [''],
    tmSlip: [''],
    tmStatus: [''],
    userId: [''],
    bkId: [''],
    userFirstname: [''],
    userLastname: [''],
    userPhone: [''],
    userEmail: [''],
    userDisease: [''],
    userDepartment: [''],
    bkQueue: [''],
    bkDate: [''],
    bkTime: [''],
    bkSymptom: [''],
    user: {
      userId: [''],
      userFirstname: [''],
      userLastname: [''],
      userPhone: [''],
      userEmail: [''],
      userDisease: [''],
    },
    booking: {
      bkId: [''],
      bkQueue: [''],
      bkDate: [''],
      bkTime: [''],
      bkSymptom: [''],
    }
  });

  ngOnInit(): void {
    this.fetchData();
    // this.formValue = this.listDatausers;
  }

  refresh() {
    this.fetchData();
    window.location.reload();
  }

  fetchData() {
    this.userService.getAllTreatment().subscribe(
      (res) => {
        console.log(res)
        this.listDatauser = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  selectDataBooking(item: any) {
    debugger
    this.listDatausers.controls['tmId'].patchValue(item.tmId);
    this.listDatausers.controls['tmDate'].patchValue(item.tmDate);
    this.listDatausers.controls['bkId'].patchValue(item.booking.bkId);
    this.listDatausers.controls['userId'].patchValue(item.userId);
    this.listDatausers.controls['userFirstname'].patchValue(item.user.userFirstname);
    this.listDatausers.controls['userLastname'].patchValue(item.user.userLastname);
    this.listDatausers.controls['userPhone'].patchValue(item.user.userPhone);
    this.listDatausers.controls['userEmail'].patchValue(item.user.userEmail);
    this.listDatausers.controls['userDisease'].patchValue(item.user.userDisease);
    this.listDatausers.controls['userDepartment'].patchValue(item.user.userDepartment);
    this.listDatausers.controls['bkQueue'].patchValue(item.booking.bkQueue);
    this.listDatausers.controls['bkDate'].patchValue(item.booking.bkDate);
    this.listDatausers.controls['bkTime'].patchValue(item.booking.bkTime);
    this.listDatausers.controls['bkSymptom'].patchValue(item.booking.bkSymptom);
  }

  cancelbooking() {
    Swal.fire({
      title: 'ยกเลิกการจองหรือไม่ ?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'ยกเลิกการจองสำเร็จ!',
          '',
          'success'
        )
      }
    })
  }

}
