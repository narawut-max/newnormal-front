import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminEditadminService } from './admin-editadmin.service';

@Component({
  selector: 'app-admin-editadmin',
  templateUrl: './admin-editadmin.component.html',
  styleUrls: ['./admin-editadmin.component.css']
})
export class AdminEditadminComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private adminEditadminService: AdminEditadminService
  ) { }

  prefixNames: any = ['นาย', 'นาง', 'น.ส.'];
  bloods: any = ['A', 'B', 'AB', 'O']
  graduates: any = ['บัณฑิต(ปริญญาตรี', 'มหาบัณฑิต(ปริญญาโท)', 'ดุษฎีบัณฑิต(ปริญญาเอก)']
  departments: any = ['หู,คอ,จมูก', 'ศัลยกรรมกระดูก']
  doctorPositions: any = ['แพทย์ผู้เชี่ยวชาญด้านรังสีวิทยา', 'แพทย์ผู้เชี่ยวชาญด้านวิสัญญีวิทยา', 'แพทย์ผู้เชี่ยวชาญด้านจักษุวิทยา', 'นักวิชาการคอมพิวเตอร์ปฏิบัติการ']
  genders: any = ['ชาย', 'หญิง']
  // roles: any = [{roleId: '2', roleName: 'ผู้ป่วย'}, {roleId: '3', roleName: 'แพทย์/เจ้าหน้าที่'}]
  statusActive: any = 'A';
  subdistricts: any;
  districts: any;
  provinces: any;
  submitted = false;

  userId: any
  editDataAdminForm = this.fb.group({
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
    userDepartment: [''],
    userGraduate: [''],
    userProfessionId: [''],
    userPosition: [''],
    userPhone: [''],
    userEmail: ['', Validators.required],
    userStatus: [this.statusActive],
    userAddrass: ['', Validators.required],
    zipCode: ['', Validators.required],
    roleId: ['3'],
    subdistrict: [{ value: '', disabled: true },],
    district: [{ value: '', disabled: true },],
    province: [{ value: '', disabled: true },]
  });

  ngOnInit() {
    //load dropdown all
    this.initDropdown();
    this.userId = this.activatedroute.snapshot.paramMap.get("userId");
    this.initUserDataforEditById(this.userId);
  }

  initDropdown() {
    this.adminEditadminService.getSubdistrictAll().subscribe(res => { this.subdistricts = res; });
    this.adminEditadminService.getDistrictsAll().subscribe(res => { this.districts = res; });
    this.adminEditadminService.getProvincesAll().subscribe(res => { this.provinces = res; })
  }

  initUserDataforEditById(userId: any) {
    this.adminEditadminService.getUserById(userId).subscribe((res) => {
      console.log('!!!!!!!!!!!!res data!!!!!!!!!!!!', res)
      this.editDataAdminForm.patchValue({
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
    this.adminEditadminService.getSubdistrictByZipCode(zipCode).subscribe(
      res => {
        if (res) {
          this.editDataAdminForm.patchValue(
            {
              subdistrict: res.sdtNameTh,
              district: res.district.disNameTh,
              province: res.province.pvnNameTh
            }
          )
        }
      },
      error => {
        this.editDataAdminForm.patchValue(
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
    console.log('data :', this.editDataAdminForm.value)
    // stop here if form is invalid
    if (this.editDataAdminForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
        text: 'Something went wrong!',
      })
      return;
    } else {
      this.adminEditadminService.updateDatadoctor(this.editDataAdminForm.value).subscribe(res => {
        console.log('Create User res : ', res)
      });
    }
    this.router.navigate(['admin/manage']);
  }

  changeUserZipCode(event: any) {
    const zipCode = event.target.value;
    console.log('zipCode' + zipCode)
    this.adminEditadminService.getSubdistrictByZipCode(zipCode).subscribe(
      res => {
        console.log(res)
        if (res) {
          this.editDataAdminForm.patchValue(
            {
              subdistrict: res.sdtNameTh,
              district: res.district.disNameTh,
              province: res.province.pvnNameTh
            }
          )
        }
      },
      error => {
        this.editDataAdminForm.patchValue(
          {
            subdistrict: '',
            district: '',
            province: ''
          }
        )
      }
    );
  }

}//end
