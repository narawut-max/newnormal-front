import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AddtreatService } from './addtreat.service';

@Component({
  selector: 'app-doctor-addtreat',
  templateUrl: './doctor-addtreat.component.html',
  styleUrls: ['./doctor-addtreat.component.css']
})
export class DoctorAddtreatComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private addtreatService: AddtreatService
  ) { }

  prefixNames: any = ['นาย', 'นาง', 'น.ส.'];
  bloods: any = ['A', 'B', 'AB', 'O']
  graduates: any = ['บัณฑิต(ปริญญาตรี', 'มหาบัณฑิต(ปริญญาโท)', 'ดุษฎีบัณฑิต(ปริญญาเอก)']
  departments: any = ['หู,คอ,จมูก', 'ศัลยกรรมกระดูก']
  doctorPositions: any = ['แพทย์ผู้เชี่ยวชาญด้านรังสีวิทยา', 'แพทย์ผู้เชี่ยวชาญด้านวิสัญญีวิทยา', 'แพทย์ผู้เชี่ยวชาญด้านจักษุวิทยา']
  genders: any = ['ชาย', 'หญิง']
  //roles: any = [{roleId: '2', roleName: 'ผู้ป่วย'}, {roleId: '3', roleName: 'แพทย์/เจ้าหน้าที่'}]
  statusActive: any = 'A';
  subdistricts: any;
  districts: any;
  provinces: any;
  submitted = false;

  item: any
  tmId: any
  userId: any
  bkId: any
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

  ngOnInit() {
    //load dropdown all
    this.initDropdown();
    this.tmId = this.activatedroute.snapshot.paramMap.get("tmId");
    this.initUserDataforEditById(this.tmId);
  }

  initDropdown() {
    this.addtreatService.getSubdistrictAll().subscribe(res => { this.subdistricts = res; });
    this.addtreatService.getDistrictsAll().subscribe(res => { this.districts = res; });
    this.addtreatService.getProvincesAll().subscribe(res => { this.provinces = res; })
  }

  initUserDataforEditById(tmId: any) {
    this.addtreatService.getTreatmentByTmId(tmId).subscribe((res) => {
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
      //set default select dropdown
      this.loadUserZipCode(res.user.zipCode);
    },
      (error) => {
        console.log('!!!!!!!!!!!!!!error!!!!!!!!!!', error);
      }
    );
  }

  loadUserZipCode(zipCode: any) {
    console.log('zipCode' + zipCode)
    this.addtreatService.getSubdistrictByZipCode(zipCode).subscribe(
      res => {
        if (res) {
          this.DataUserForm.patchValue(
            {
              subdistrict: res.sdtNameTh,
              district: res.district.disNameTh,
              province: res.province.pvnNameTh
            }
          )
        }
      },
      error => {
        this.DataUserForm.patchValue(
          {
            subdistrict: '',
            district: '',
            province: ''
          }
        )
      }
    );
  }

  changeUserZipCode(event: any) {
    const zipCode = event.target.value;
    console.log('zipCode' + zipCode)
    this.addtreatService.getSubdistrictByZipCode(zipCode).subscribe(
      res => {
        console.log(res)
        if (res) {
          this.DataUserForm.patchValue(
            {
              subdistrict: res.sdtNameTh,
              district: res.district.disNameTh,
              province: res.province.pvnNameTh
            }
          )
        }
      },
      error => {
        this.DataUserForm.patchValue(
          {
            subdistrict: '',
            district: '',
            province: ''
          }
        )
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
      // this.addtreatService.createBilldrug(this.DataUserForm.value).subscribe(res => {
      //   console.log('create Billdrug res : ', res)
      // });
      this.addtreatService.updateTreatment(this.DataUserForm.value).subscribe(res => {
        console.log('create Billdrug res : ', res)
      });
      this.addtreatService.updateUser(this.DataUserForm.value).subscribe(res => {
        console.log('Update User res : ', res)
      });
      this.addtreatService.updatebooking(this.DataUserForm.value).subscribe(res => {
        console.log('Update Booking res : ', res)
      });
      Swal.fire({
        icon: 'success',
        title: 'บันทึกข้อมูลสำเร็จ',
        text: 'ต้องการสั่งยาหรือไม่',
        confirmButtonText: 'เพิ่มข้อมูลการสั่งยา',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['doctor/treat/add-drug', + this.tmId]);
        }
      })
    }
  }

  onSubmitNext() {
    this.submitted = true;
    console.log('data :', this.DataUserForm.value)
    if (this.DataUserForm.invalid) {
    } else {
      this.addtreatService.createBilldrug(this.DataUserForm.value).subscribe(res => {
        console.log('create Billdrug res : ', res)
      });
    }
  }

  
  get userf() { return this.DataUserForm.controls; }

}//end