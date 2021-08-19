import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ManagemoneyService } from './managemoney.service';

@Component({
  selector: 'app-admin-managemoney',
  templateUrl: './admin-managemoney.component.html',
  styleUrls: ['./admin-managemoney.component.css']
})
export class AdminManagemoneyComponent implements OnInit {
  
  formValue !: FormGroup;
  listDatas !: any;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private managemoneyService: ManagemoneyService,
  ) { }


  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [3, 6, 9, 12];

  listData = this.fb.group({
    tmId: [''],
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
    this.fetchData();
    this.formValue = this.listData;
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

  pageChanged(event: any) {
    this.page = event;
    this.fetchData();
  }

  selectData(item: any){
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
  }

  selectslipmoney() {
    Swal.fire({
      imageUrl: 'https://obs.line-scdn.net/0hd_rioZEKO3BPEBPqvuFEJ3VGOB98fChzKyZqcxN-ZUQ2dylxISZzHmxFYElqKXwuISJwHm0SIEEwIiwlcX5z/w644',
      imageWidth: 400,
      imageHeight: 500,
      imageAlt: 'Custom image',
    })
  }



}
