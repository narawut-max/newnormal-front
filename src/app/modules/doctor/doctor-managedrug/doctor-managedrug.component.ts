import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DoctorService } from '../doctor.service';
import { ManagredrugService } from './managredrug.service';

@Component({
  selector: 'app-doctor-managedrug',
  templateUrl: './doctor-managedrug.component.html',
  styleUrls: ['./doctor-managedrug.component.css']
})
export class DoctorManagedrugComponent implements OnInit {

  listDataBill : any;
  listDataDrug : any;
  statusActive: any = 'A';
  tmId: any
  item: any

  billId: string | any
  bkId: string | any
  userHnId: string | any
  userFirstname: string | any
  userLastname: string | any

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private managredrugService: ManagredrugService
  ) { }

  listDatausers = this.fb.group({
    tmId: [''],
    userId: [''],
    bkId: [''],
    billId: [''],
    tmDate: [''],
    tmTime: [''],
    tmMoney: [''],
    tmSlip: [''],
    tmStatus: [''],
    userUsername: [''],
    userPassword: [''],
    userCardId: [''],
    userHnId: [''],
    userTitle: [''],
    userFirstname: [''],
    userLastname: [''],
    userGender: [''],
    userBirthday: [''],
    userBlood: [''],
    userPhone: [''],
    userEmail: [''],
    userDisease: [''],
    userAddrass: [''],
    userAllergy: [''],
    userStatus: [this.statusActive],
    roleId: ['2'],
    billDate: [''],
    billTime: [''],
    billNext: [''],
    drugId: [''],
    bkQueue: [''],
    bkDate: [''],
    bkTime: [''],
    bkSymptom: [''],
    billdrug: {},
    user: {},
    booking: {}
  });

  ngOnInit(): void {
    this.fetchData();
  }

  refresh() {
    this.fetchData();
    window.location.reload();
  }

  fetchData() {
    this.managredrugService.getAllTreatment().subscribe(
      (res) => {
        console.log(res)
        this.listDataBill = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  selectDataBill(item: any) {
    debugger
    this.listDatausers.controls['tmId'].patchValue(item.tmId);
    this.listDatausers.controls['userId'].patchValue(item.userId);
    this.listDatausers.controls['userHnId'].patchValue(item.user.userHnId);
    this.listDatausers.controls['userFirstname'].patchValue(item.user.userFirstname);
    this.listDatausers.controls['userLastname'].patchValue(item.user.userLastname);
    this.listDatausers.controls['userPhone'].patchValue(item.user.userPhone);
    this.listDatausers.controls['userEmail'].patchValue(item.user.userEmail);
    this.listDatausers.controls['userDisease'].patchValue(item.user.userDisease);
    this.listDatausers.controls['bkId'].patchValue(item.booking.bkId);
    this.listDatausers.controls['bkQueue'].patchValue(item.booking.bkQueue);
    this.listDatausers.controls['bkDate'].patchValue(item.booking.bkDate);
    this.listDatausers.controls['bkTime'].patchValue(item.booking.bkTime);
    this.listDatausers.controls['bkSymptom'].patchValue(item.booking.bkSymptom);
  }

  gotoCancalBill() {
    Swal.fire({
      title: 'ยกเลิกรายการยา?',
      text: "ต้องการยกเลิกรายการสั่งยาหรือไม่",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยันการยกเลิก',
      cancelButtonText: 'ปิด'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'ยกเลิกรายการสำเร็จ',
          confirmButtonText: 'ปิดหน้าต่าง'
        }
        ).then((result) => {
          if (result.isConfirmed) {
            window.location.reload()
          }
        })
      }
    })
  }

  getSearchTreatByCriteria() {
    debugger
    let resp = this.managredrugService.searchTreatByCriteria(this.billId, this.bkId, this.userHnId, this.userFirstname, this.userLastname);
    resp.subscribe((data)=> this.listDataBill = data);
  }

  get userf() { return this.listDatausers.controls; }
}
