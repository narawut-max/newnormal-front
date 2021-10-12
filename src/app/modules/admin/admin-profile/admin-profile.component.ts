import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AddressService } from '../../address.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService,
    private addressService: AddressService
  ) { }

  subdistricts: any;
  districts: any;
  provinces: any;
  statusActive: any = 'A';
  userId: any

  prefixNames: any = ['นาย', 'นาง', 'น.ส.'];
  bloods: any = ['A', 'B', 'AB', 'O']
  graduates: any = ['บัณฑิต(ปริญญาตรี)', 'มหาบัณฑิต(ปริญญาโท)', 'ดุษฎีบัณฑิต(ปริญญาเอก)']
  departments: any = ['หู,คอ,จมูก', 'ศัลยกรรมกระดูก']
  doctorPositions: any = ['แพทย์ผู้เชี่ยวชาญด้านรังสีวิทยา', 'แพทย์ผู้เชี่ยวชาญด้านวิสัญญีวิทยา', 'แพทย์ผู้เชี่ยวชาญด้านจักษุวิทยา', 'นักวิชาการคอมพิวเตอร์ปฏิบัติการ']
  genders: any = ['ชาย', 'หญิง']

  submitted = false;

  DataAdminForm = this.fb.group({
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
    // userProfessionId: [''],
    userPosition: [''],
    userPhone: [''],
    userEmail: ['', Validators.required],
    userStatus: [this.statusActive],
    userAddrass: ['', Validators.required],
    zipCode: ['', Validators.required],
    roleId: ['1'],
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
    this.initUserDataforEditById(userId);
  }

  initDropdown() {
    // this.addressService.getSubdistrictAll().subscribe(res => { this.subdistricts = res; });
    this.addressService.getDistrictsAll().subscribe(res => { this.districts = res; });
    this.addressService.getProvincesAll().subscribe(res => { this.provinces = res; })
  }

  initUserDataforEditById(userId: any) {
    debugger
    this.adminService.getUserByUserId(userId).subscribe((res) => {
      this.addressService.getsubdistrictsByZipCode1(res.zipCode).subscribe(res => { this.subdistricts = res; console.log('data :', res) });
      console.log('!!!!!!!!!!!!res data!!!!!!!!!!!!', res)
      this.DataAdminForm.patchValue({
        userId: res.userId,
        userUsername: res.userUsername,
        userPassword: res.userPassword,
        userCardId: res.userCardId,
        userHnId: res.userHnId,
        userTitle: res.userTitle,
        userFirstname: res.userFirstname,
        userLastname: res.userLastname,
        userGender: res.userGender,
        userBirthday: res.userBirthday,
        userBlood: res.userBlood,
        userGraduate: res.userGraduate,
        // userProfessionId: res.userProfessionId,
        userPosition: res.userPosition,
        userPhone: res.userPhone,
        userEmail: res.userEmail,
        userStatus: res.userStatus,
        userAddrass: res.userAddrass,
        zipCode: res.zipCode,
        roleId: res.roleId,
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
    this.DataAdminForm.controls['sdtId'].enable();
    this.addressService.getsubdistrictsBySdtId(sdtId).subscribe(
      res => {
        if (res) {
          this.DataAdminForm.patchValue(
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
        this.DataAdminForm.patchValue(
          {
            subdistrict: '',
            district: '',
            province: ''
          }
        )
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    console.log('data :', this.DataAdminForm.value)
    if (this.DataAdminForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
        text: '',
      })
    } else {
      Swal.fire({
        title: 'ยืนยันการทำรายการ',
        text: "ต้องการบันทึกข้อมูลหรือไม่ ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#198754',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.isConfirmed) {
          this.adminService.updateDataAdmin(this.DataAdminForm.value).subscribe(res => {
            console.log('Update User res : ', res)
          });
          Swal.fire({
            icon: 'success',
            title: 'บันทึกข้อมูลสำเร็จ',
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
          this.DataAdminForm.patchValue(
            {
              // subdistrict: res.sdtNameTh,
              district: res.district.disNameTh,
              province: res.province.pvnNameTh
            }
          )
        }
      },
      error => {
        this.DataAdminForm.patchValue(
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

}//end
