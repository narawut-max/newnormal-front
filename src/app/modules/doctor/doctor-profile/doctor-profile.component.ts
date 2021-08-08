import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private doctorService: DoctorService
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

  userId: any
  DataDoctorForm = this.fb.group({
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
    subdistrict: [{value: '', disabled: true},],
    district: [{value: '', disabled: true},],
    province: [{value: '', disabled: true},]
  });

  ngOnInit(): void {
    //load dropdown all
    this.initDropdown();
    this.initUserDataforEditById(this.userId);
  }

  initDropdown() {
    this.doctorService.getSubdistrictAll().subscribe(res => { this.subdistricts = res; });
    this.doctorService.getDistrictsAll().subscribe(res => { this.districts = res; });
    this.doctorService.getProvincesAll().subscribe(res => { this.provinces = res; })
  }

  // show edit
  initUserDataforEditById(userId: any) {
    this.doctorService.getUserByUserId(userId).subscribe((res) => {
      console.log('!!!!!!!!!!!!res data!!!!!!!!!!!!', res)
      this.DataDoctorForm.patchValue({
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
        userDepartment: res.userDepartment,
        userGraduate: res.userGraduate,
        userProfessionId: res.userProfessionId,
        userPosition: res.userPosition,
        userPhone: res.userPhone,
        userEmail: res.userEmail,
        userStatus: res.userStatus,
        userAddrass: res.userAddrass,
        zipCode: res.zipCode,
        roleId: res.roleId,
        subdistrict: res.subdistrict,
        district: res.district,
        province: res.province,
      });

      //set default select dropdown
      this.loadUserZipCode(res.zipCode);
    },
      (error) => {
        console.log('!!!!!!!!!!!!!!error!!!!!!!!!!', error);
      }
    );
  }

  loadUserZipCode(zipCode: any) {
    console.log('zipCode' + zipCode)
    this.doctorService.getSubdistrictByZipCode(zipCode).subscribe(
      res => {
        if (res) {
          this.DataDoctorForm.patchValue(
            {
              subdistrict: res.sdtNameTh,
              district: res.district.disNameTh,
              province: res.province.pvnNameTh
            }
          )
        }
      },
      error => {
        this.DataDoctorForm.patchValue(
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
    console.log('data :',this.DataDoctorForm.value)
    // stop here if form is invalid
    if (this.DataDoctorForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
        text: 'Something went wrong!',
      })
      return;
    } else {
      this.doctorService.updateDatadoctor(this.DataDoctorForm.value).subscribe(res => {
        console.log('Create User res : ', res)
      });
    }
    this.router.navigate(['doctor/profile']);
    window.location.reload();
  }

  changeUserZipCode(event: any) {
    const zipCode = event.target.value;
    console.log('zipCode' + zipCode)
    this.doctorService.getSubdistrictByZipCode(zipCode).subscribe(
      res => {
        console.log(res)
        if (res) {
          this.DataDoctorForm.patchValue(
            {
              subdistrict: res.sdtNameTh,
              district: res.district.disNameTh,
              province: res.province.pvnNameTh
            }
          )
        }
      },
      error => {
        this.DataDoctorForm.patchValue(
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
