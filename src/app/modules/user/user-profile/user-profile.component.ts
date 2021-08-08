import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  prefixNames: any = ['นาย', 'นาง', 'น.ส.'];
  bloods: any = ['A', 'B', 'AB', 'O']
  graduates: any = ['บัณฑิต(ปริญญาตรี)', 'มหาบัณฑิต(ปริญญาโท)', 'ดุษฎีบัณฑิต(ปริญญาเอก)']
  departments: any = ['หู,คอ,จมูก', 'ศัลยกรรมกระดูก']
  doctorPositions: any = ['แพทย์ผู้เชี่ยวชาญด้านรังสีวิทยา', 'แพทย์ผู้เชี่ยวชาญด้านวิสัญญีวิทยา', 'แพทย์ผู้เชี่ยวชาญด้านจักษุวิทยา']
  genders: any = ['ชาย', 'หญิง']
  // roles: any = [{roleId: '2', roleName: 'ผู้ป่วย'}, {roleId: '3', roleName: 'แพทย์/เจ้าหน้าที่'}]
  statusActive: any = 'A';
  subdistricts: any;
  districts: any;
  provinces: any;
  submitted = false;

  tmId: any
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
    userStatus: [this.statusActive],
    roleId: ['2'],
    bkQueue: ['', Validators.required],
    bkDate: ['', Validators.required],
    bkTime: ['', Validators.required],
    bkSymptom: ['', Validators.required],
    bkProcess: [''],
    zipCode: ['', Validators.required],
    subdistrict: [],
    district: [],
    province: [],
    billDate: [''],
    billTime: [''],
    billNext: [''],
    drugId: [''],
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
      userStatus: [this.statusActive],
      roleId: ['2'],
    },
    booking: {
      bkId: [0],
      bkQueue: ['', Validators.required],
      bkDate: ['', Validators.required],
      bkTime: ['', Validators.required],
      bkSymptom: ['', Validators.required],
      bkProcess: [''],
    },
    billdrug: {
      billDate: [''],
      billTime: [''],
      billNext: [''],
      drugId: [''],
    }
  });

  ngOnInit(): void {
    //load dropdown all
    this.initDropdown();
    this.initUserDataforEditById(this.tmId);
  }

  initDropdown() {
    this.userService.getSubdistrictAll().subscribe(res => { this.subdistricts = res; });
    this.userService.getDistrictsAll().subscribe(res => { this.districts = res; });
    this.userService.getProvincesAll().subscribe(res => { this.provinces = res; })
  }

  // show edit
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
        userStatus: res.user.userStatus,
        roleId: res.user.roleId,
        bkQueue: res.booking.bkQueue,
        bkDate: res.booking.bkDate,
        bkTime: res.booking.bkTime,
        bkSymptom: res.booking.bkSymptom,
        bkProcess: res.booking.bkProcess,
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
    this.userService.getSubdistrictByZipCode(zipCode).subscribe(
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

  SubmitEditPass() {
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
        title: 'เปลี่ยนรหัสผ่านใหม่',
        text: "ยืนยันการเปลี่ยนรหัสผ่านหรือไม่ ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#198754',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ปิด'
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.updateDatauser(this.DataUserForm.value).subscribe(res => {
            console.log('Create User res : ', res)
          });
          Swal.fire({
            icon: 'success',
            title: 'เปลี่ยนรหัสผ่านใหม่สำเร็จ',
            text: '',
            confirmButtonText: 'ปิดหน้าต่าง',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload()
            } else if (result.isDismissed) {
              window.location.reload()

            }
          })
        }
      })
    }
  }

  onSubmitTel() {
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
        text: "ต้องการเปลี่ยนเบอร์โทรศัพท์หรือไม่ ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#198754',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ปิด'
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.updateDatauser(this.DataUserForm.value).subscribe(res => {
            console.log('Create User res : ', res)
          });
          Swal.fire({
            icon: 'success',
            title: 'เปลี่ยนเบอร์โทรศัพท์สำเร็จ',
            text: '',
            confirmButtonText: 'ปิดหน้าต่าง',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload()
            } else if (result.isDismissed) {
              window.location.reload()

            }
          })
        }
      })
    }
  }

  onSubmitEmail() {
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
        text: "ต้องการเปลี่ยนอีเมลหรือไม่ ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#198754',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ปิด'
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.updateDatauser(this.DataUserForm.value).subscribe(res => {
            console.log('Create User res : ', res)
          });
          Swal.fire({
            icon: 'success',
            title: 'เปลี่ยนอีเมลสำเร็จ',
            text: '',
            confirmButtonText: 'ปิดหน้าต่าง',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload()
            } else if (result.isDismissed) {
              window.location.reload()

            }
          })
        }
      })
    }
  }

  changeUserZipCode(event: any) {
    const zipCode = event.target.value;
    console.log('zipCode' + zipCode)
    this.userService.getSubdistrictByZipCode(zipCode).subscribe(
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


  get userf() { return this.DataUserForm.controls; }

}
