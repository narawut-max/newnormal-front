import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AddressService } from '../../address.service';
import { AdminEdituserService } from './admin-edituser.service';

@Component({
  selector: 'app-admin-edituser',
  templateUrl: './admin-edituser.component.html',
  styleUrls: ['./admin-edituser.component.css']
})
export class AdminEdituserComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private adminEdituserService: AdminEdituserService,
    private addressService: AddressService
  ) { }

  prefixNames: any = ['นาย', 'นาง', 'น.ส.'];
  bloods: any = ['A', 'B', 'AB', 'O']
  graduates: any = ['บัณฑิต(ปริญญาตรี)', 'มหาบัณฑิต(ปริญญาโท)', 'ดุษฎีบัณฑิต(ปริญญาเอก)']
  departments: any = ['หู,คอ,จมูก', 'ศัลยกรรมกระดูก']
  doctorPositions: any = ['แพทย์ผู้เชี่ยวชาญด้านรังสีวิทยา', 'แพทย์ผู้เชี่ยวชาญด้านวิสัญญีวิทยา', 'แพทย์ผู้เชี่ยวชาญด้านจักษุวิทยา']
  genders: any = ['ชาย', 'หญิง']
  //roles: any = [{roleId: '2', roleName: 'ผู้ป่วย'}, {roleId: '3', roleName: 'แพทย์/เจ้าหน้าที่'}]
  statusActive: any = 'A';
  subdistricts: any;
  districts: any;
  provinces: any;
  submitted = false;

  userId: any
  editDataUserForm = this.fb.group({
    userId: [0],
    userUsername: ['', Validators.required],
    userPassword: ['', Validators.required],
    userCardId: ['', Validators.required],
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
    userHnId: [''],
    zipCode: ['', Validators.required],
    roleId: ['2'],
    sdtId: [{ value: '', disabled: true },],
    district: [{ value: '', disabled: true },],
    province: [{ value: '', disabled: true },],

    subdistrictInput: [''],
    districtInput: [''],
    provinceInput: ['']
  });

  ngOnInit() {
    //load dropdown all
    this.initDropdown();
    this.userId = this.activatedroute.snapshot.paramMap.get("userId");
    this.initUserDataforEditById(this.userId);
  }

  initDropdown() {
    // this.addressService.getSubdistrictAll().subscribe(res => { this.subdistricts = res; });
    this.addressService.getDistrictsAll().subscribe(res => { this.districts = res; });
    this.addressService.getProvincesAll().subscribe(res => { this.provinces = res; })
  }


  initUserDataforEditById(userId: any) {
    this.adminEdituserService.getUserById(userId).subscribe((res) => {
      this.addressService.getsubdistrictsByZipCode1(res.zipCode).subscribe(res => { this.subdistricts = res; console.log('data :', res) });
      console.log('!!!!!!!!!!!!res data!!!!!!!!!!!!', res)
      this.editDataUserForm.patchValue({
        userId: res.userId,
        userUsername: res.userUsername,
        userPassword: res.userPassword,
        userCardId: res.userCardId,
        userTitle: res.userTitle,
        userFirstname: res.userFirstname,
        userLastname: res.userLastname,
        userGender: res.userGender,
        userBirthday: res.userBirthday,
        userBlood: res.userBlood,
        userDisease: res.userDisease,
        userDepartment: res.userDepartment,
        userAllergy: res.userAllergy,
        userPhone: res.userPhone,
        userEmail: res.userEmail,
        userStatus: res.userStatus,
        userAddrass: res.userAddrass,
        userHnId: res.userHnId,
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
    this.editDataUserForm.controls['sdtId'].enable();
    this.addressService.getsubdistrictsBySdtId(sdtId).subscribe(
      res => {
        if (res) {
          this.editDataUserForm.patchValue(
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
        this.editDataUserForm.patchValue(
          {
            subdistrict: '',
            district: '',
            province: ''
          }
        )
      }
    );
  }

  onSubmitUser() {
    this.submitted = true;
    console.log('data :', this.editDataUserForm.value)
    if (this.editDataUserForm.invalid) {
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
        cancelButtonText: 'ปิด'
      }).then((result) => {
        if (result.isConfirmed) {
          this.adminEdituserService.updateDatauser(this.editDataUserForm.value).subscribe(res => {
            console.log('Create User res : ', res)
          });
          Swal.fire({
            icon: 'success',
            title: 'บันทึกข้อมูลสำเร็จ',
            text: '',
            confirmButtonText: 'ปิดหน้าต่าง',
          }).then((result) => {
            if (result.isConfirmed) {
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
    this.addressService.getsubdistrictsByZipCode1(zipCode).subscribe(res => { this.subdistricts = res; console.log('data :', res) });
    this.addressService.getsubdistrictsByZipCode(zipCode).subscribe(
      res => {
        console.log(res)
        if (res) {
          this.editDataUserForm.patchValue(
            {
              // subdistrict: res.sdtNameTh,
              district: res.district.disNameTh,
              province: res.province.pvnNameTh
            }
          )
        }
      },
      error => {
        this.editDataUserForm.patchValue(
          {
            subdistrict: '',
            district: '',
            province: ''
          }
        )
      }
    );
  }
}

