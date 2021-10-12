import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AddressService } from '../../address.service';
import { AdminRegisterService } from './admin-register.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {

  prefixNames: any = ['นาย', 'นาง', 'น.ส.'];
  bloods: any = ['A', 'B', 'AB', 'O']
  graduates: any = ['บัณฑิต(ปริญญาตรี)', 'มหาบัณฑิต(ปริญญาโท)', 'ดุษฎีบัณฑิต(ปริญญาเอก)']
  departments: any = ['หู,คอ,จมูก', 'ศัลยกรรมกระดูก']
  doctorPositions: any = ['แพทย์ผู้เชี่ยวชาญด้านรังสีวิทยา', 'แพทย์ผู้เชี่ยวชาญด้านวิสัญญีวิทยา', 'แพทย์ผู้เชี่ยวชาญด้านจักษุวิทยา', 'นักวิชาการคอมพิวเตอร์ปฏิบัติการ']
  genders: any = ['ชาย', 'หญิง']
  //roles: any = [{roleId: '2', roleName: 'ผู้ป่วย'}, {roleId: '3', roleName: 'แพทย์/เจ้าหน้าที่'}]
  statusActive: any = 'A';

  subdistricts: any;
  districts: any;
  provinces: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public adminRegisterService: AdminRegisterService,
    private addressService : AddressService
  ) { }

  submitted = false;

  userRegisterForm = this.fb.group({
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
    userBlood: ['', Validators.required],
    userDisease: ['', Validators.required],
    userDepartment: ['', Validators.required],
    userAllergy: [''],
    userPhone: [''],
    userEmail: ['', Validators.required],
    userStatus: [this.statusActive],
    userAddrass: ['', Validators.required],
    zipCode: ['', Validators.required],
    roleId: ['2'],
    // subdistrict: [{value: '', disabled: true},],
    sdtId: [{value: ''},],
    district: [{value: '', disabled: true},],
    province: [{value: '', disabled: true},]
  });

  doctorRegisterForm = this.fb.group({
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
    userBlood: ['', Validators.required],
    userDepartment: ['', Validators.required],
    userGraduate: [''],
    userProfessionId: [''],
    userPosition: [''],
    userPhone: [''],
    userEmail: ['', Validators.required],
    userStatus: [this.statusActive],
    userAddrass: ['', Validators.required],
    zipCode: ['', Validators.required],
    roleId: ['3'],
    // subdistrict: [{value: '', disabled: true},],
    sdtId: [{value: ''},],
    district: [{value: '', disabled: true},],
    province: [{value: '', disabled: true},]
  });

  AdminRegisterForm = this.fb.group({
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
    userBlood: ['', Validators.required],
    userGraduate: [''],
    userProfessionId: [''],
    userPosition: [''],
    userPhone: [''],
    userEmail: ['', Validators.required],
    userStatus: [this.statusActive],
    userAddrass: ['', Validators.required],
    zipCode: ['', Validators.required],
    roleId: ['1'],
    // subdistrict: [{value: '', disabled: true},],
    sdtId: [{value: ''},],
    district: [{value: '', disabled: true},],
    province: [{value: '', disabled: true},]
  });

  ngOnInit(): void {
    //load dropdown all
    // this.userRegisterForm.controls['sdtId'].disable();
    // this.doctorRegisterForm.controls['sdtId'].disable();
    // this.AdminRegisterForm.controls['sdtId'].disable();
    // this.adminRegisterService.getSubdistrictAll().subscribe(res => { this.subdistricts = res; });
    this.addressService.getDistrictsAll().subscribe(res => { this.districts = res; });
    this.addressService.getProvincesAll().subscribe(res => { this.provinces = res; })

  }

  onSubmit() {
    this.submitted = true;
    console.log('data :',this.userRegisterForm.value)
    // stop here if form is invalid
    if (this.userRegisterForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
        text: 'Something went wrong!',
      })
      return;
    } else {
      Swal.fire({
        title: 'ยืนยันการทำรายการ',
        text: "ต้องการบันทึกข้อมูลหรือไม่ ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#198754',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.isConfirmed) {
          this.adminRegisterService.createUser(this.userRegisterForm.value).subscribe(res => {
            console.log('Create User res : ', res)
          });
          Swal.fire({
            icon: 'success',
            title: 'บันทึกข้อมูลสำเร็จ',
            text: '',
            confirmButtonText: 'ปิดหน้าต่าง',
          }).then((result) => {
            if (result.isConfirmed) {
              // window.location.reload();
              this.router.navigate(['admin/manage']);
            } else if (result.isDismissed) {
              window.location.reload()

            }
          })
        }
      })
    }
  }

  onSubmitDoctor() {
    this.submitted = true;
    console.log('data :',this.doctorRegisterForm.value)
    if (this.doctorRegisterForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
        text: 'Something went wrong!',
      })
      return;
    } else {
      Swal.fire({
        title: 'ยืนยันการทำรายการ',
        text: "ต้องการบันทึกข้อมูลหรือไม่ ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#198754',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.isConfirmed) {
          this.adminRegisterService.createUser(this.doctorRegisterForm.value).subscribe(res => {
            console.log('Create Doctor res : ', res)
          });
          Swal.fire({
            icon: 'success',
            title: 'บันทึกข้อมูลสำเร็จ',
            text: '',
            confirmButtonText: 'ปิดหน้าต่าง',
          }).then((result) => {
            if (result.isConfirmed) {
              // window.location.reload();
              this.router.navigate(['admin/manage']);
            } else if (result.isDismissed) {
              window.location.reload()

            }
          })
        }
      })
    }
  }

  onSubmitAdmin() {
    this.submitted = true;
    console.log('data :',this.AdminRegisterForm.value)
    if (this.AdminRegisterForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
        text: 'Something went wrong!',
      })
      return;
    } else {
      Swal.fire({
        title: 'ยืนยันการทำรายการ',
        text: "ต้องการบันทึกข้อมูลหรือไม่ ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#198754',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.isConfirmed) {
          this.adminRegisterService.createUser(this.AdminRegisterForm.value).subscribe(res => {
            console.log('Create Doctor res : ', res)
          });
          Swal.fire({
            icon: 'success',
            title: 'บันทึกข้อมูลสำเร็จ',
            text: '',
            confirmButtonText: 'ปิดหน้าต่าง',
          }).then((result) => {
            if (result.isConfirmed) {
              // window.location.reload();
              this.router.navigate(['admin/manage']);
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
    // this.userRegisterForm.controls['sdtId'].disable();

    // เรียกตำบล
    this.addressService.getsubdistrictsByZipCode1(zipCode).subscribe(res => { this.subdistricts = res; console.log('data :', res) });
    this.addressService.getsubdistrictsByZipCode(zipCode).subscribe(
      res => {
      console.log(res)
      if (res) {
        this.userRegisterForm.patchValue(
          {
            // subdistrict: res.sdtNameTh,
            district: res.district.disNameTh,
            province: res.province.pvnNameTh
          }
        )
      }
    },
    error => {
      this.userRegisterForm.patchValue(
        {
          subdistrict: '',
          district: '',
          province: ''
        }
      )
    }
    );
  }

  changeDoctorZipCode(event: any) {
    const zipCode = event.target.value;
    console.log('zipCode' + zipCode)
    // this.doctorRegisterForm.controls['sdtId'].disable();

    // เรียกตำบล
    this.addressService.getsubdistrictsByZipCode1(zipCode).subscribe(res => { this.subdistricts = res; console.log('data :', res) });
    this.addressService.getsubdistrictsByZipCode(zipCode).subscribe(
      res => {
      console.log(res)
      if (res) {
        this.doctorRegisterForm.patchValue(
          {
            subdistrict: res.sdtNameTh,
            district: res.district.disNameTh,
            province: res.province.pvnNameTh
          }
        )
      }
    },
    error => {
      this.doctorRegisterForm.patchValue(
        {
          subdistrict: '',
          district: '',
          province: ''
        }
      )
    }
    );
  }

  changeAdminZipCode(event: any) {
    const zipCode = event.target.value;
    console.log('zipCode' + zipCode)
    // this.doctorRegisterForm.controls['sdtId'].disable();

    // เรียกตำบล
    this.addressService.getsubdistrictsByZipCode1(zipCode).subscribe(res => { this.subdistricts = res; console.log('data :', res) });
    this.addressService.getsubdistrictsByZipCode(zipCode).subscribe(
      res => {
      console.log(res)
      if (res) {
        this.AdminRegisterForm.patchValue(
          {
            subdistrict: res.sdtNameTh,
            district: res.district.disNameTh,
            province: res.province.pvnNameTh
          }
        )
      }
    },
    error => {
      this.doctorRegisterForm.patchValue(
        {
          subdistrict: '',
          district: '',
          province: ''
        }
      )
    }
    );
  }

  // check Password
  changeUserConfirmPassword(event: any) {
    debugger
    const pass = this.userRegisterForm.controls['userPassword'].value;
    const confirmPassword = event.target.value;
    if (pass.localeCompare(confirmPassword) != 0) {
      Swal.fire({
        icon: 'error',
        title: 'รหัสผ่านไม่ตรงกัน',
        text: 'กรุณากรอกยืนยันรหัสผ่านให้ถูกต้อง!',
      })
      return;
    }
  }

  changeDoctorConfirmPassword(event: any) {
    debugger
    const pass = this.doctorRegisterForm.controls['userPassword'].value;
    const confirmPassword = event.target.value;
    if (pass.localeCompare(confirmPassword) != 0) {
      Swal.fire({
        icon: 'error',
        title: 'รหัสผ่านไม่ตรงกัน',
        text: 'กรุณากรอกยืนยันรหัสผ่านให้ถูกต้อง!',
      })
      return;
    }
  }

  changeAdminConfirmPassword(event: any) {
    debugger
    const pass = this.AdminRegisterForm.controls['userPassword'].value;
    const confirmPassword = event.target.value;
    if (pass.localeCompare(confirmPassword) != 0) {
      Swal.fire({
        icon: 'error',
        title: 'รหัสผ่านไม่ตรงกัน',
        text: 'กรุณากรอกยืนยันรหัสผ่านให้ถูกต้อง!',
      })
      return;
    }
  }

  get userf() { return this.userRegisterForm.controls; }
  get doctorf() { return this.doctorRegisterForm.controls; }
  get adminf() { return this.AdminRegisterForm.controls; }

  // savedatauser() {
  //   Swal.fire({
  //     title: 'ยืนยันข้อมูลหรือไม่ ?',
  //     // text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#00CC00',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'ยืนยันข้อมูล',
  //     cancelButtonText: 'ยกเลิก'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire(
  //         'ผลการทำรายการ',
  //         'บันทึกข้อมูลสำเร็จ',
  //         'success',
  //       )
  //     }
  //   })
  // }

}
