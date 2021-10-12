import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AddressService } from '../../address.service';
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
    private userService: UserService,
    private addressService: AddressService
  ) { }

  subdistricts: any;
  districts: any;
  provinces: any;
  statusActive: any = 'A';

  prefixNames: any = ['นาย', 'นาง', 'น.ส.'];
  bloods: any = ['A', 'B', 'AB', 'O']
  graduates: any = ['บัณฑิต(ปริญญาตรี)', 'มหาบัณฑิต(ปริญญาโท)', 'ดุษฎีบัณฑิต(ปริญญาเอก)']
  departments: any = ['หู,คอ,จมูก', 'ศัลยกรรมกระดูก']
  doctorPositions: any = ['แพทย์ผู้เชี่ยวชาญด้านรังสีวิทยา', 'แพทย์ผู้เชี่ยวชาญด้านวิสัญญีวิทยา', 'แพทย์ผู้เชี่ยวชาญด้านจักษุวิทยา']
  genders: any = ['ชาย', 'หญิง']
  
  submitted = false;

  DataUserForm = this.fb.group({
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
    userDepartment: [],
    userAddrass: [''],
    userAllergy: [''],
    userStatus: [this.statusActive],
    roleId: ['2'],
    zipCode: ['', Validators.required],
    sdtId: [{ value: '', disabled: true },],
    district: [{ value: '', disabled: true },],
    province: [{ value: '', disabled: true },],
    subdistrictInput: [''],
    districtInput: [''],
    provinceInput: ['']
  });

  ngOnInit(): void {
    //load dropdown all
    this.initDropdown();
    const userId = sessionStorage.getItem('user_id');
    this.getUserByUserId(userId);
  }

  initDropdown() {
    // this.addressService.getSubdistrictAll().subscribe(res => { this.subdistricts = res; });
    this.addressService.getDistrictsAll().subscribe(res => { this.districts = res; });
    this.addressService.getProvincesAll().subscribe(res => { this.provinces = res; })
  }

  // show edit
  getUserByUserId(userId: any) {
    this.userService.getUserByUserId(userId).subscribe((res) => {
      this.addressService.getsubdistrictsByZipCode1(res.zipCode).subscribe(res => { this.subdistricts = res; console.log('data :', res) });
      console.log('!!!!!!!!!!!!res data!!!!!!!!!!!!', res)
      this.DataUserForm.patchValue({
        userId: res.userId,
        userCardId: res.userCardId,
        userHnId: res.userHnId,
        userUsername: res.userUsername,
        userPassword: res.userPassword,
        userTitle: res.userTitle,
        userFirstname: res.userFirstname,
        userLastname: res.userLastname,
        userGender: res.userGender,
        userBirthday: res.userBirthday,
        userBlood: res.userBlood,
        userPhone: res.userPhone,
        userEmail: res.userEmail,
        userDisease: res.userDisease,
        userDepartment: res.userDepartment,
        userAddrass: res.userAddrass,
        userAllergy: res.userAllergy,
        userStatus: res.userStatus,
        roleId: res.roleId,
        zipCode: res.zipCode,
        subdistrictInput: res.subdistrict,
        districtInput: res.district,
        provinceInput: res.province,
      });
      //set default select dropdown
      this.loadUserZipCode(res.sdtId);
    },
      (error) => {
        console.log('!!!!!!!!!!!!!!error!!!!!!!!!!', error);
      }
    );
  }

  loadUserZipCode(sdtId: any) {
    console.log('zipCode' + sdtId)
    this.DataUserForm.controls['sdtId'].enable();
    this.addressService.getsubdistrictsBySdtId(sdtId).subscribe(
      res => {
        if (res) {
          this.DataUserForm.patchValue(
            {
              sdtId: res.sdtId,
              district: res.district.disNameTh,
              province: res.province.pvnNameTh,

              subdistrictInput: res.sdtNameTh,
              districtInput: res.district.disNameTh,
              provinceInput: res.province.pvnNameTh
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
    this.addressService.getsubdistrictsByZipCode1(zipCode).subscribe(res => { this.subdistricts = res; console.log('data :', res) });
    this.addressService.getsubdistrictsByZipCode(zipCode).subscribe(
      res => {
        console.log(res)
        if (res) {
          this.DataUserForm.patchValue(
            {
              // subdistrict: res.sdtNameTh,
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

  refresh() {
    window.location.reload();
  }
  get userf() { return this.DataUserForm.controls; }

}
