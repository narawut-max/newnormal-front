import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from '../../address.service';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor-report-datauser',
  templateUrl: './doctor-report-datauser.component.html',
  styleUrls: ['./doctor-report-datauser.component.css']
})
export class DoctorReportDatauserComponent implements OnInit {

  Datatreats !: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private doctorService: DoctorService,
    private addressService : AddressService
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
  user_id: any

  ReportUserForm = this.fb.group({
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
  });

  ngOnInit() {
    //load dropdown all
    this.initDropdown();
    this.userId = this.activatedroute.snapshot.paramMap.get("userId");
    this.initUserDataById(this.userId);
    this.fetchData(this.userId);
  }

  initDropdown() {
    // this.addressService.getSubdistrictAll().subscribe(res => { this.subdistricts = res; });
    this.addressService.getDistrictsAll().subscribe(res => { this.districts = res; });
    this.addressService.getProvincesAll().subscribe(res => { this.provinces = res; })
  }

  fetchData(userId: any) {
    this.doctorService.gettreatmentsByUserId(userId).subscribe(
      (res) => {
        console.log(res)
        this.Datatreats = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  initUserDataById(userId: any) {
    this.doctorService.getUserByUserId(userId).subscribe((res) => {
      console.log('!!!!!!!!!!!!res data!!!!!!!!!!!!', res)
      debugger
      this.ReportUserForm.patchValue({
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
    this.ReportUserForm.controls['sdtId'].enable();
    this.addressService.getsubdistrictsBySdtId(sdtId).subscribe(
      res => {
        if (res) {
          this.ReportUserForm.patchValue(
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
        this.ReportUserForm.patchValue(
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
          this.ReportUserForm.patchValue(
            {
              // subdistrict: res.sdtNameTh,
              district: res.district.disNameTh,
              province: res.province.pvnNameTh
            }
          )
        }
      },
      error => {
        this.ReportUserForm.patchValue(
          {
            subdistrict: '',
            district: '',
            province: ''
          }
        )
      }
    );
  }

  generateReport(userId: any) {
    this.doctorService.generateTreatmentReport(userId).subscribe(data => {
      console.log('report===>', data)
      if (data.body) {
        let pdf = window.URL.createObjectURL(new Blob([data.body], { type: 'application/pdf' }))
        window.open(pdf);
      }
    })
  }

  get userf() { return this.ReportUserForm.controls; }
}
