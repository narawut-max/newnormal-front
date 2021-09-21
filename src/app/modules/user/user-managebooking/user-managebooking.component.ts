import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-managebooking',
  templateUrl: './user-managebooking.component.html',
  styleUrls: ['./user-managebooking.component.css']
})
export class UserManagebookingComponent implements OnInit {

  searchText: any;
  listDatauser: any;
  item: any

  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [3, 6, 9, 12];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  listDatausers = this.fb.group({
    tmId: ['', Validators.required],
    tmDate: ['', Validators.required],
    userId: [0],
    userFirstname: ['', Validators.required],
    userLastname: ['', Validators.required],
    userHnId: [''],
    userDisease: [''],
    userDepartment: [''],
    userPhone: [''],
    userEmail: ['', Validators.required],
    bkId: [0],
    bkSymptom: ['']
  });

  ngOnInit(): void {
    const userId = sessionStorage.getItem('user_id');
    debugger
    this.fetchData(userId);
  }

  refresh() {
    // this.fetchData();
    window.location.reload();
  }

  fetchData(userId: any) {
    this.userService.gettreatmentsByUserId(userId).subscribe(
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
    this.listDatausers.controls['bkId'].patchValue(item.bkId);
    this.listDatausers.controls['bkSymptom'].patchValue(item.booking.bkSymptom);
    this.listDatausers.controls['tmId'].patchValue(item.tmId);
    this.listDatausers.controls['tmDate'].patchValue(item.tmDate);
    this.listDatausers.controls['userId'].patchValue(item.userId);
    this.listDatausers.controls['userFirstname'].patchValue(item.user.userFirstname);
    this.listDatausers.controls['userLastname'].patchValue(item.user.userLastname);
    this.listDatausers.controls['userHnId'].patchValue(item.user.userHnId);
    // this.listDatausers.controls['userDisease'].patchValue(item.user.userDisease);
    this.listDatausers.controls['userDepartment'].patchValue(item.user.userDepartment);
    this.listDatausers.controls['userPhone'].patchValue(item.user.userPhone);
    this.listDatausers.controls['userEmail'].patchValue(item.user.userEmail);
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

  pageChanged(userId: any) {
    this.page = userId;
    this.fetchData(userId);
  }

}

