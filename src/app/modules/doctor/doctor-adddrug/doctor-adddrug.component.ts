import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DoctorAdddrugService } from './doctor-adddrug.service';

@Component({
  selector: 'app-doctor-adddrug',
  templateUrl: './doctor-adddrug.component.html',
  styleUrls: ['./doctor-adddrug.component.css'],
})
export class DoctorAdddrugComponent implements OnInit {

  formValue !: FormGroup;
  listDatadrugs !: any;

  statusActive: any = 'A';
  item: any
  tmId: any
  userId: any
  bkId: any
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private doctorAdddrugService: DoctorAdddrugService
  ) { }

  DataUserForm = this.fb.group({
    tmId: ['', Validators.required],
    tmDate: [''],
    tmTime: [''],
    tmMoney: [''],
    tmSlip: [''],
    tmStatus: [''],
    tmProcess: [''],
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
    userStatus: [this.statusActive],
    roleId: ['2'],
    bkQueue: ['', Validators.required],
    bkDate: ['', Validators.required],
    bkTime: ['', Validators.required],
    bkSymptom: ['', Validators.required],
    zipCode: ['', Validators.required],
    subdistrict: [],
    district: [],
    province: [],
    billDate: [''],
    billTime: [''],
    billNext: [''],
    drugId: [''],
    user: {},
    booking: {},
    billdrug: {}
  });

  ngOnInit(): void {
    this.fetchData();
    this.tmId = this.activatedroute.snapshot.paramMap.get("tmId");
    this.initUserDataforEditById(this.tmId);
  }

  fetchData() {
    this.doctorAdddrugService.getAllDrugs().subscribe(
      (res) => {
        console.log(res)
        this.listDatadrugs = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  initUserDataforEditById(tmId: any) {
    this.doctorAdddrugService.getTreatmentByTmId(tmId).subscribe((res) => {
      console.log('!!!!!!!!!!!!res data!!!!!!!!!!!!', res)
      this.DataUserForm.patchValue({
        tmId: res.tmId,
        tmDate: res.tmDate,
        tmTime: res.tmTime,
        tmMoney: res.tmMoney,
        tmSlip: res.tmSlip,
        tmStatus: res.tmStatus,
        tmProcess: res.tmProcess,
        bkId: res.bkId,
        userId: res.userId,
        userCardId: res.user.userCardId,
        userHnId: res.user.userHnId,
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
        userStatus: res.user.userStatus,
        roleId: res.user.roleId,
        bkQueue: res.booking.bkQueue,
        bkDate: res.booking.bkDate,
        bkTime: res.booking.bkTime,
        bkSymptom: res.booking.bkSymptom,
        zipCode: res.user.zipCode,
        subdistrict: res.subdistrict,
        district: res.district,
        province: res.province,
      });
    },
      (error) => {
        console.log('!!!!!!!!!!!!!!error!!!!!!!!!!', error);
      }
    );
  }

  onSubmitUser(item: any) {
    this.submitted = true;
    console.log('data :', this.DataUserForm.value)
    if (this.DataUserForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
        text: '',
      })
    } else {
      Swal.fire({
        title: 'ยืนยันการทำรายการ',
        text: "ต้องการยืนยันการสั่งยาหรือไม่ ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#198754',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ปิด'
      }).then((result) => {
        if (result.isConfirmed) {
          this.doctorAdddrugService.createBilldrug(this.DataUserForm.value).subscribe(res => {
            console.log('create Billdrug res : ', res)
          });
          this.doctorAdddrugService.updateTreatment(this.DataUserForm.value).subscribe(res => {
            console.log('Update Treatment res : ', res)
          });
          Swal.fire({
            icon: 'success',
            title: 'บันทึกข้อมูลสำเร็จ',
            text: '',
            confirmButtonText: 'พิมพ์ใบสั่งยา',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['doctor/treat/printdatadrug']);
            }
          })
        }
      })
    }
  }

  generateReport(billId: any){
    this.doctorAdddrugService.generateBilldrugReport(billId).subscribe(data => {
      console.log('report===>', data)
      if (data.body) {
        let pdf = window.URL.createObjectURL(new Blob([data.body], {type: 'application/pdf'}))
        window.open(pdf);
      }
    })
  }

}//end
