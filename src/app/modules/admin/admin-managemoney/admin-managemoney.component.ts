import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ManagemoneyService } from './managemoney.service';

@Component({
  selector: 'app-admin-managemoney',
  templateUrl: './admin-managemoney.component.html',
  styleUrls: ['./admin-managemoney.component.css']
})
export class AdminManagemoneyComponent implements OnInit {

  imagePathSelected: any;
  submitted = false;
  tmId: any;
  listDatas: any;
  listDataImages: any;
  searchText: any;
  tm_id_param: any

  public myQrCode: any | string = null;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private managemoneyService: ManagemoneyService,
  ) { }


  page = 1;
  count = 0;
  tableSize = 5;
  tableSizes = [3, 6, 9, 12];

  listData = this.fb.group({
    tmId: [0],
    tmDate: [''],
    tmTime: [''],
    tmMoney: [''],
    tmSlip: [''],
    tmStatus: [''],
    userId: [''],
    bkId: [''],
    billId: [''],
    userFirstname: [''],
    userLastname: [''],
    userHnId: [''],
    user: {}
  });

  ngOnInit(): void {
    this.tmId = this.activatedroute.snapshot.paramMap.get("tmId");
    this.fetchData();
    this.myQrCode = 'ราคารวม';
  }

  refresh() {
    this.fetchData();
    window.location.reload();
  }

  fetchData() {
    this.managemoneyService.getAllTreatment().subscribe(
      (res) => {
        console.log(res)
        this.listDatas = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  fetchImages(tmId: any) {
    this.managemoneyService.getTreatmentByTmId(tmId).subscribe(
      (res) => {
        console.log(res)
        this.listDataImages = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  pageChanged(event: any) {
    this.page = event;
    this.fetchData();
  }

  selectData(item: any) {
    this.listData.controls['tmId'].setValue(item.tmId);
    this.listData.controls['tmDate'].setValue(item.tmDate);
    this.listData.controls['tmTime'].setValue(item.tmTime);
    this.listData.controls['tmMoney'].setValue(item.tmMoney);
    this.listData.controls['tmSlip'].setValue(item.tmSlip);
    this.listData.controls['tmStatus'].setValue(item.tmStatus);
    this.listData.controls['userId'].setValue(item.userId);
    this.listData.controls['userHnId'].setValue(item.user.userHnId);
    this.listData.controls['userFirstname'].setValue(item.user.userFirstname);
    this.listData.controls['userLastname'].setValue(item.user.userLastname);
    this.listData.controls['bkId'].setValue(item.bkId);
    this.listData.controls['billId'].setValue(item.billId);
    // C:\fakepath\IMG_1551.JPG
    if (item.tmSlip) {
      debugger
      var filePaths = item.tmSlip.split("\\");    
      this.imagePathSelected = "http://localhost:9080/newnormal-api/uploads/" + filePaths[2];
  }
}

  gotoSuccess(item: any) {
    // this.submitted = true;
    console.log('data :', this.listData.value)
    Swal.fire({
      title: 'ยืนยันข้อมูลหรือไม่ ?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tm_id_param = item.bkId;
        this.listData.patchValue(
          {
            tmId: item.tmId,
            tmSlip: item.tmSlip,
            tmStatus: 'S'
          }
        )
        this.managemoneyService.updateTreatmentStatus(this.listData.value).subscribe(
          (res) => {
            Swal.fire({
              icon: 'success',
              title: 'บันทึกข้อมูลสำเร็จ',
              text: '',
              confirmButtonText: 'ปิดหน้าต่าง',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            })
          },
          (error) => {
            console.log('delete User error : ', error);
          }
        );
      }
    })
  }

  gotoNewFile(item: any) {
    // this.submitted = true;
    console.log('data :', this.listData.value)
    Swal.fire({
      title: 'แจ้งให้แนบไฟล์ใหม่อีกครั้ง',
      text: "ยืนยันการทำรายการหรือไม่ ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tm_id_param = item.bkId;
        this.listData.patchValue(
          {
            tmId: item.tmId,
            tmSlip: item.tmSlip,
            tmStatus: 'N'
          }
        )
        this.managemoneyService.updateTreatmentStatus(this.listData.value).subscribe(
          (res) => {
            Swal.fire({
              icon: 'success',
              title: 'บันทึกข้อมูลสำเร็จ',
              text: '',
              confirmButtonText: 'ปิดหน้าต่าง',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            })
          },
          (error) => {
            console.log('delete User error : ', error);
          }
        );
      }
    })
  }

}//end
