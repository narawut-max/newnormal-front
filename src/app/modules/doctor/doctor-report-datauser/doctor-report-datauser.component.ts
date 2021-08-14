import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private doctorService: DoctorService
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
  // ReportUserForm = this.fb.group({
  //   tmId: ['', Validators.required],
  //   tmDate: ['', Validators.required],
  //   tmTime: ['', Validators.required],
  //   tmMoney: ['', Validators.required],
  //   tmSlip: ['', Validators.required],
  //   tmStatus: ['', Validators.required],
  //   billId: [0],
  //   bkId: [0],
  //   userId: [0],
  //   userUsername: ['', Validators.required],
  //   userPassword: ['', Validators.required],
  //   userCardId: ['', Validators.required],
  //   userHnId: [''],
  //   userTitle: ['', Validators.required],
  //   userFirstname: ['', Validators.required],
  //   userLastname: ['', Validators.required],
  //   userGender: ['', Validators.required],
  //   userBirthday: ['', Validators.required],
  //   userBlood: [''],
  //   userPhone: [''],
  //   userEmail: ['', Validators.required],
  //   userDisease: [''],
  //   userAddrass: [''],
  //   userAllergy: [''],
  //   userStatus: [this.statusActive],
  //   roleId: ['2'],
  //   bkQueue: ['', Validators.required],
  //   bkDate: ['', Validators.required],
  //   bkTime: ['', Validators.required],
  //   bkSymptom: ['', Validators.required],
  //   bkProcess: [''],
  //   zipCode: ['', Validators.required],
  //   subdistrict: [],
  //   district: [],
  //   province: [],
  //   billDate: [''],
  //   billTime: [''],
  //   billNext: [''],
  //   drugId: [''],
  //   user: {},
  //   booking: { },
  //   billdrug: {}
  // });
  
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
    subdistrict: [],
    district: [],
    province: [],
  });

  ngOnInit() {
    //load dropdown all
    this.initDropdown();
    this.userId = this.activatedroute.snapshot.paramMap.get("userId");
    this.initUserDataById(this.userId);
    // this.initUserDataById(this.tmId);
    this.fetchData();
  }

  initDropdown() {
    this.doctorService.getSubdistrictAll().subscribe(res => { this.subdistricts = res; });
    this.doctorService.getDistrictsAll().subscribe(res => { this.districts = res; });
    this.doctorService.getProvincesAll().subscribe(res => { this.provinces = res; })
  }

  fetchData() {
    this.doctorService.getAllTreatment().subscribe(
      (res) => {
        console.log(res)
        this.Datatreats = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // initUserDataById(tmId: any) {
  //   this.doctorService.getTreatmentByTmId(tmId).subscribe((res) => {
  //     console.log('!!!!!!!!!!!!res data!!!!!!!!!!!!', res)
  //     this.ReportUserForm.patchValue({
  //       tmId: res.tmId,
  //       tmDate: res.tmDate,
  //       tmTime: res.tmTime,
  //       tmMoney: res.tmMoney,
  //       tmSlip: res.tmSlip,
  //       tmStatus: res.tmStatus,
  //       bkId: res.bkId,
  //       userId: res.userId,
  //       userCardId: res.user.userCardId,
  //       userHnId: res.user.userHnId,
  //       userUsername: res.user.userUsername,
  //       userPassword: res.user.userPassword,
  //       userTitle: res.user.userTitle,
  //       userFirstname: res.user.userFirstname,
  //       userLastname: res.user.userLastname,
  //       userGender: res.user.userGender,
  //       userBirthday: res.user.userBirthday,
  //       userBlood: res.user.userBlood,
  //       userPhone: res.user.userPhone,
  //       userEmail: res.user.userEmail,
  //       userDisease: res.user.userDisease,
  //       userAddrass: res.user.userAddrass,
  //       userAllergy: res.user.userAllergy,
  //       userStatus: res.user.userStatus,
  //       roleId: res.user.roleId,
  //       bkQueue: res.booking.bkQueue,
  //       bkDate: res.booking.bkDate,
  //       bkTime: res.booking.bkTime,
  //       bkSymptom: res.booking.bkSymptom,
  //       bkProcess: res.booking.bkProcess,
  //       zipCode: res.user.zipCode,
  //       subdistrict: res.subdistrict,
  //       district: res.district,
  //       province: res.province,
  //     });
  //     //set default select dropdown
  //     this.loadUserZipCode(res.user.zipCode);
  //   },
  //     (error) => {
  //       console.log('!!!!!!!!!!!!!!error!!!!!!!!!!', error);
  //     }
  //   );
  // }

  initUserDataById(userId: any) {
    this.doctorService.getUserByUserId(userId).subscribe((res) => {
      console.log('!!!!!!!!!!!!res data!!!!!!!!!!!!', res)
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
          this.ReportUserForm.patchValue(
            {
              subdistrict: res.sdtNameTh,
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

  changeUserZipCode(event: any) {
    const zipCode = event.target.value;
    console.log('zipCode' + zipCode)
    this.doctorService.getSubdistrictByZipCode(zipCode).subscribe(
      res => {
        console.log(res)
        if (res) {
          this.ReportUserForm.patchValue(
            {
              subdistrict: res.sdtNameTh,
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

  get userf() { return this.ReportUserForm.controls; }
}
