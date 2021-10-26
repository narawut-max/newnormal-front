import { Component, OnInit } from '@angular/core';
import { FormBuilder, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ManagredrugService } from './managredrug.service';

@Component({
  selector: 'app-doctor-managedrug',
  templateUrl: './doctor-managedrug.component.html',
  styleUrls: ['./doctor-managedrug.component.css']
})
export class DoctorManagedrugComponent implements OnInit {

  submitted = false;
  page = 1;
  count = 0;
  tableSize = 5;
  tableSizes = [3, 6, 9, 12];

  listDatauser: any;
  listDataDrug: any;
  statusActive: any = 'A';
  tmId: any
  item: any
  bill_id_param: any

  billId: any
  bkId: any
  userHnId: any
  userFirstname: any
  userLastname: any

  public myAngularxQrCode: any | string = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
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
    billStatus: [''],
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
        this.listDatauser = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  fetchDrug() {
    this.managredrugService.getAllTreatment().subscribe(
      (res) => {
        console.log(res)
        this.listDatauser = res;
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
    this.listDatausers.controls['billStatus'].patchValue(item.billdrug.billStatus);
  }

  // gotoCancalBill(item: any) {
  //   Swal.fire({
  //     title: 'ยกเลิกรายการยา?',
  //     text: "ต้องการยกเลิกรายการสั่งยาหรือไม่",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#198754',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'ยืนยันการยกเลิก',
  //     cancelButtonText: 'ปิด'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'ยกเลิกรายการสำเร็จ',
  //         confirmButtonText: 'ปิดหน้าต่าง'
  //       }
  //       ).then((result) => {
  //         if (result.isConfirmed) {
  //           window.location.reload()
  //         }
  //       })
  //     }
  //   })
  // }

  gotoCancalBill(item: any) {
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
        this.listDatausers.patchValue(
          {
            billId: item.billId,
            tmId: item.tmId,
            billStatus: 'C',
            tmStatus: 'C'
          }
        )
        this.managredrugService.updateBilldrugStatus(this.listDatausers.value).subscribe(
          (res) => {
            console.log('create BillDrug res : ', res)
          })
        this.listDatausers.patchValue(
          {
            tmId: item.tmId,
            tmStatus: 'C'
          }
        )
        debugger
        this.managredrugService.updateTreatmentStatus(this.listDatausers.value).subscribe(
          (res) => {
            console.log('create Treatment res : ', res)
          })
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
        setTimeout(function () { window.location.reload(); }, 2 * 1000);
      }
    })
  }

  getSearchTreatByCriteria() {
    debugger
    let resp = this.managredrugService.searchTreatByCriteria(this.billId, this.bkId, this.userHnId, this.userFirstname, this.userLastname);
    resp.subscribe((data) => this.listDatauser = data);
  }

  pageChanged(event: any) {
    this.page = event;
    // this.fetchData(bkDepartment);
  }


  generateReport(billId: any) {
    this.managredrugService.generateBilldrugReport(billId).subscribe(data => {
      console.log('report===>', data)
      if (data.body) {
        let pdf = window.URL.createObjectURL(new Blob([data.body], { type: 'application/pdf' }))
        window.open(pdf);
      }
    })
  }

  get userf() { return this.listDatausers.controls; }
}
