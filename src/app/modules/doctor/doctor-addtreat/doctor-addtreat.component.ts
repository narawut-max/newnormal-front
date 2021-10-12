import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AddressService } from '../../address.service';
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
    private addtreatService: AddtreatService,
    private addressService: AddressService
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
    bkId: [0],
    bkQueue: ['', Validators.required],
    bkDate: ['', Validators.required],
    bkTime: ['', Validators.required],
    bkSymptom: ['', Validators.required],
    bkDepartment: ['', Validators.required],
    bkStatus: [''],

    tmId: [0],
    tmProcess: [''],

    billId: [0],
    billDate: [''],
    billTime: [''],
    billNext: [''],

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
    zipCode: ['', Validators.required],
    sdtId: [{ value: '', disabled: true },],
    district: [{ value: '', disabled: true },],
    province: [{ value: '', disabled: true },],

    subdistrictInput: [''],
    districtInput: [''],
    provinceInput: [''],

    user: {},
    treatment: {},
    billdrug: {}
  });

  ngOnInit() {
    //load dropdown all
    this.initDropdown();
    this.bkId = this.activatedroute.snapshot.paramMap.get("bkId");
    this.initUserDataforEditById(this.bkId);
    const userId = sessionStorage.getItem('user_id');
  }

  initDropdown() {
    // this.addressService.getSubdistrictAll().subscribe(res => { this.subdistricts = res; });
    this.addressService.getDistrictsAll().subscribe(res => { this.districts = res; });
    this.addressService.getProvincesAll().subscribe(res => { this.provinces = res; })
  }

  initUserDataforEditById(bkId: any) {
    this.addtreatService.getBookingsByBkId(bkId).subscribe((res) => {
      console.log('!!!!!!!!!!!!res data!!!!!!!!!!!!', res)
      this.DataUserForm.patchValue({
        bkId: res.bkId,
        bkQueue: res.bkQueue,
        bkDate: res.bkDate,
        bkTime: res.bkTime,
        bkSymptom: res.bkSymptom,
        bkDepartment: res.bkDepartment,

        tmId: res.tmId,
        tmProcess: res.tmProcess,

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
        zipCode: res.user.zipCode,
        subdistrictInput: res.subdistrict,
        districtInput: res.district,
        provinceInput: res.province,

      });
      //set default select dropdown
      this.loadUserZipCode(res.user.sdtId);
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
      this.DataUserForm.patchValue(
        {
          bkStatus: 'S'
        }
      )
      this.addtreatService.updatebooking(this.DataUserForm.value).subscribe(res => {
        console.log('update booking res : ', res)
        if (res) {
          //for save Treatment
          this.addtreatService.createTreatment(this.DataUserForm.value).subscribe(res => {
            console.log('create Treatment res : ', res)
            Swal.fire({
              icon: 'success',
              title: 'บันทึกข้อมูลสำเร็จ',
              text: 'ต้องการสั่งยาหรือไม่',
              confirmButtonText: 'เพิ่มข้อมูลการสั่งยา',
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['doctor/treat/add-drug', + res.tmId]);
              }
            })
          });

          //for update data user
          this.addtreatService.updateUser(this.DataUserForm.value).subscribe(res => {
            console.log('create Treatment res : ', res)
          });
        }
      });
      // this.addtreatService.createBilldrug(this.DataUserForm.value).subscribe(res => {
      //   console.log('create Billdrug res : ', res)
      // });
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