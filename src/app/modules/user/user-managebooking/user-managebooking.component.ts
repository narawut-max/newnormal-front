import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-managebooking',
  templateUrl: './user-managebooking.component.html',
  styleUrls: ['./user-managebooking.component.css']
})
export class UserManagebookingComponent implements OnInit {

  submitted = false;
  searchText: any;
  listDatauser: any;
  item: any
  bkId: any
  bk_id_param: any

  page = 1;
  count = 0;
  tableSize = 5;
  tableSizes = [3, 6, 9, 12];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private userService: UserService
  ) { }

  listDatausers = this.fb.group({
    bkId: [0],
    bkQueue: [''],
    userId: [''],
    bkDate: ['', [Validators.required]],
    bkTime: ['', [Validators.required]],
    bkSymptom: ['', [Validators.required]],
    bkDepartment: [''],
    bkStatus: [''],
    userFirstname: ['', Validators.required],
    userLastname: ['', Validators.required],
    userHnId: [''],
    userGender: [''],
    userBlood: [''],
    userDisease: [''],
    userPhone: [''],
    userEmail: ['', Validators.required],
  });

  ngOnInit(): void {
    debugger
    this.bkId = this.activatedroute.snapshot.paramMap.get("bkId");
    const bkId = sessionStorage.getItem('user_bkId');
    const userId = sessionStorage.getItem('user_id');
    this.fetchData(userId);
  }

  refresh() {
    // this.fetchData();
    window.location.reload();
  }

  fetchData(userId: any) {
    this.userService.getbookingsByUserId(userId).subscribe(
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
    this.listDatausers.controls['userId'].patchValue(item.userId);
    this.listDatausers.controls['userHnId'].patchValue(item.user.userHnId);
    this.listDatausers.controls['bkDate'].patchValue(item.bkDate);
    this.listDatausers.controls['bkTime'].patchValue(item.bkTime);
    this.listDatausers.controls['userFirstname'].patchValue(item.user.userFirstname);
    this.listDatausers.controls['userLastname'].patchValue(item.user.userLastname);
    this.listDatausers.controls['userGender'].patchValue(item.user.userGender);
    this.listDatausers.controls['userBlood'].patchValue(item.user.userBlood);
    this.listDatausers.controls['bkSymptom'].patchValue(item.bkSymptom);
    this.listDatausers.controls['userPhone'].patchValue(item.user.userPhone);
    this.listDatausers.controls['userEmail'].patchValue(item.user.userEmail);
    this.listDatausers.controls['bkDepartment'].patchValue(item.bkDepartment);
    this.listDatausers.controls['bkStatus'].patchValue(item.bkStatus);
    // this.listDatausers.controls['userDisease'].patchValue(item.user.userDisease);
  }

  cancelbooking(item: any) {
    debugger
    this.submitted = true;
    if (this.listDatausers.invalid) {
      Swal.fire({
        title: 'ยกเลิกการจองหรือไม่ ?',
        text: "หมายเลขการจองคิวที่ : " + item.bkId,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#198754',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.isConfirmed) {
          this.bk_id_param = item.bkId;
          this.listDatausers.patchValue(
            {
              bkId: item.bkId,
              bkStatus: 'C'
            }
          )
          console.log('data :', this.listDatausers.value)
          this.userService.updateBookingStatus(this.listDatausers.value).subscribe(
            (res) => {
              console.log('create Treatment res : ', res)
              Swal.fire({
                icon: 'success',
                title: 'ยกเลิกรายการสำเร็จ',
              })
              setTimeout(function () { window.location.reload(); }, 2 * 1000);
            }
          );
        }
      })
    }

  }

  pageChanged(event: any) {
    this.page = event;
    // this.fetchData(userId);
  }

}

