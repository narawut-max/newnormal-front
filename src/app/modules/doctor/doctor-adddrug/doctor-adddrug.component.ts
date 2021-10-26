import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DoctorAdddrugService } from './doctor-adddrug.service';
import { UUID } from 'angular2-uuid';
@Component({
  selector: 'app-doctor-adddrug',
  templateUrl: './doctor-adddrug.component.html',
  styleUrls: ['./doctor-adddrug.component.css'],
})
export class DoctorAdddrugComponent implements OnInit {

  public myAngularxQrCode: any | string = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private doctorAdddrugService: DoctorAdddrugService
  ) {

  }

  public tmMoney: number = 0;

  page = 1;
  count = 0;
  tableSize = 5;
  tableSizes = [3, 6, 9, 12];

  cartDrugs = new Array();
  cartDrugsForUpdate = new Array();
  cartDrugsForSaveDetails = new Array();
  cartDrugsForDetailsUpdate = new Array();

  listDatadrugs: any = []; //SearchDrud
  drugTotalPrice: number = 0;
  total: number = 0;

  statusActive: any = 'A';
  item: any
  tmId: any
  userId: any
  bkId: any

  drugId: string | any;
  drugTrademark: string | any;
  drugName: string | any;
  submitted = false;

  DataUserForm = this.fb.group({
    tmId: ['', Validators.required],
    tmDate: [''],
    tmTime: [''],
    tmMoney: [''],
    tmSlip: [''],
    tmStatus: [''],
    tmProcess: [''],
    billId: [''],
    bkId: [''],
    userId: [''],
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
    bkQueue: ['', Validators.required],
    bkDate: ['', Validators.required],
    bkTime: ['', Validators.required],
    bkSymptom: ['', Validators.required],
    bkDepartment: ['', Validators.required],
    zipCode: ['', Validators.required],
    subdistrict: [],
    district: [],
    province: [],
    billDate: [''],
    billTime: [''],
    billNext: [''],
    drugId: [''],
    drugName: [''],
    user: {},
    booking: {},
    billdrug: {
      billdrugDetails: {}
    }
  });

  ngOnInit(): void {
    debugger
    // this.fetchData();
    this.tmId = this.activatedroute.snapshot.paramMap.get("tmId");
    this.initUserDataforEditById(this.tmId);
    this.listDatadrugs = this.fetchData();
    this.tmMoney = this.getTotalPrice();
    // this.myAngularxQrCode = this.tmId;
  }

  fetchData() {
    this.doctorAdddrugService.getAllDrugs().subscribe(
      (res) => {
        console.log(res)
        this.listDatadrugs = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  initUserDataforEditById(tmId: any) {
    this.doctorAdddrugService.getTreatmentByTmId(tmId).subscribe((res) => {
      console.log('!!!!!!!!!!!!res data!!!!!!!!!!!!', res)
      this.DataUserForm.patchValue({
        tmId: res.tmId,
        tmDate: res.tmDate,
        tmTime: res.tmTime,
        tmMoney: res.tmMoney,
        tmSlip: res.tmSlip,
        tmStatus: res.tmStatus,
        tmProcess: res.tmProcess,
        bkId: res.bkId,
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
        bkQueue: res.booking.bkQueue,
        bkDate: res.booking.bkDate,
        bkTime: res.booking.bkTime,
        bkSymptom: res.booking.bkSymptom,
        bkDepartment: res.booking.bkDepartment,
        zipCode: res.user.zipCode,
        subdistrict: res.subdistrict,
        district: res.district,
        province: res.province,
      });
    },
      (error) => {
        console.log('!!!!!!!!!!!!!!error!!!!!!!!!!', error);
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
      Swal.fire({
        title: 'ยืนยันการทำรายการ',
        text: "ต้องการยืนยันการสั่งยาหรือไม่ ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#198754',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ปิด'
      }).then((result) => {
        if (result.isConfirmed) {
          this.doctorAdddrugService.createBilldrug(this.DataUserForm.value).subscribe(res => {
            debugger
            console.log('create Billdrug res : ', res)
            if (res) {
              // add service save bil detail here
              this.cartDrugs.forEach(data => {
                data['billdrugDetailId'] = 0;
                data['tmId'] = res.tmId,
                  data['billId'] = res.billId,
                  // this.cartDrugsForUpdate
                  this.cartDrugsForSaveDetails.push(data);
              });
              console.log('cartDrugsForSaveDetails : ', this.cartDrugsForSaveDetails)

              //for save detail
              this.doctorAdddrugService.createBilldrugDetails(this.cartDrugsForSaveDetails).subscribe(response => {
                debugger
                console.log('create Billdrug Details res : ', response)
                if (res) {
                  this.cartDrugsForSaveDetails.forEach(data => {
                    data['billdrugDetailId'] = res.billdrugDetailId;
                    data['tmId'] = res.tmId,
                      data['billId'] = res.billId,
                      this.cartDrugsForDetailsUpdate.push(data);
                  });
                  console.log('Update success: ', this.cartDrugsForDetailsUpdate)

                  //for update Treatment
                  let dataForUpdateTreatment = new Array();
                  if (this.cartDrugsForDetailsUpdate) {
                    let group: any = {};
                    var summaryAmout = 0;
                    group['tmId'] = res.tmId;
                    group['billId'] = res.billId;
                    this.cartDrugsForDetailsUpdate.forEach(data => {
                      summaryAmout += data.drugTotalPrice;
                    });
                    group['tmMoney'] = summaryAmout;
                    dataForUpdateTreatment.push(group);
                  }
                  console.log('dataForUpdateTreatment : ', dataForUpdateTreatment)

                  this.doctorAdddrugService.updateTreatment(dataForUpdateTreatment).subscribe(response => {
                    console.log('update Treatment res : ', response)
                    Swal.fire({
                      icon: 'success',
                      title: 'บันทึกข้อมูลสำเร็จ',
                      text: '',
                      confirmButtonText: 'พิมพ์ใบสั่งยา',
                    }).then((result) => {
                      if (result.isConfirmed) {
                        debugger
                        const bill_id = response[0].billId;
                        if (bill_id) {
                          this.generateReport(bill_id);
                          this.router.navigate(['doctor/managedrug']);
                        } else {
                          Swal.fire({
                            icon: 'error',
                            title: 'Generate Report Fail!',
                            text: 'Something went wrong!',
                          })
                        }
                      }
                    })
                  })
                }
              })
            }
          });
        }
      })
    }
  }

  generateReport(billId: any) {
    this.doctorAdddrugService.generateBilldrugReport(billId).subscribe(data => {
      console.log('report===>', data)
      if (data.body) {
        let pdf = window.URL.createObjectURL(new Blob([data.body], { type: 'application/pdf' }))
        window.open(pdf);
      }
    })
  }

  getSearchByDrugName() {
    debugger
    let resp = this.doctorAdddrugService.searchDrugByCriteria(this.drugId, this.drugName, this.drugTrademark);
    resp.subscribe((data) => this.listDatadrugs = data);
  }

  // *******************************
  addDrug(drug: any) {
    console.log(drug)
    drug['key'] = UUID.UUID();
    drug['drugCount'] = 1; //default count
    drug['drugTotalPrice'] = drug.drugPrice * drug.drugCount; //คำนวณราคารวม
    this.cartDrugs.push(drug);
    this.tmMoney = this.getTotalPrice();
    console.log('this array ->', this.cartDrugs)
  }


  addDrugCount(drug: any) {
    let item = this.cartDrugs.findIndex(i => i.key == drug.key);
    drug.drugCount = drug.drugCount + 1;
    drug.drugTotalPrice = drug.drugPrice * drug.drugCount;
    this.cartDrugs[item] = drug;
    this.tmMoney = this.getTotalPrice();
    console.log('addDrugCount key ->', drug.key)
    console.log('addDrugCount ->', this.cartDrugs)
    debugger
  }

  removeDrugCount(drug: any) {
    let item = this.cartDrugs.findIndex(i => i.key == drug.key);
    if (drug.drugCount > 1) {
      drug.drugCount = drug.drugCount - 1;
      drug.drugTotalPrice = drug.drugPrice * drug.drugCount;
    }
    this.cartDrugs[item] = drug;
    this.tmMoney = this.getTotalPrice();
    console.log('removeDrugCount key ->', drug.key)
    console.log('removeDrugCount ->', this.cartDrugs)
    debugger
  }

  getTotalPrice() {
    let tmMoney = 0;
    this.cartDrugs.map((a: any) => {
      tmMoney += (a.drugPrice * a.drugCount)
    })
    return tmMoney;
  }

  // Delete Drug
  removeDrug(index: number) {
    // console.log(drug)
    this.cartDrugs.splice(index, 1)
    console.log('this array delete ->', this.cartDrugs)
    this.tmMoney = this.getTotalPrice();
  }

  pageChanged(event: any) {
    this.page = event;
    this.fetchData();
  }

}//end

