import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  currentDate = new Date();
  
  searchText: any;
  listDatauser: any;
  item: any

  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [3, 6, 9, 12];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }
  
  listDatausers = this.fb.group({
    tmId: [''],
    userId: [''],
    bkId: [''],
    userHnId: [''],
    userFirstname: [''],
    userLastname: [''],
    userPhone: [''],
    userEmail: [''],
    userDisease: [''],
    userDepartment: [''],
    bkQueue: [''],
    bkDate: [''],
    bkTime: [''],
    bkSymptom: [''],
    user: {},
    booking: {}
  });

  ngOnInit(): void {
    this.fetchData();
  }

  isShowUpdateStatus(bkStatus: any) {
    return bkStatus != 'C' && bkStatus != 'S';
  }

  getStatusDesc(bkStatus: any) {
    var statusDesc = '-';

    if (bkStatus == 'C') {
      statusDesc = 'ยกเลิกจอง'
    }

    if (bkStatus == 'S') {
      statusDesc = 'รักษาแล้ว'
    }

    if (bkStatus == 'N') {
      statusDesc = 'รอรักษา'
    }

    if (bkStatus == 'W') {
      statusDesc = 'รอรักษา'
    }

    return statusDesc;
  }

  getStatusColorClass(bkStatus: any) {
    var statusColorClass = 'bg-primary ';

    if (bkStatus == 'C') {
      statusColorClass = 'bg-danger'
    }

    if (bkStatus == 'S') {
      statusColorClass = 'bg-success'
    }

    if (bkStatus == 'N') {
      statusColorClass = 'bg-warning'
    }

    if (bkStatus == 'W') {
      statusColorClass = 'bg-warning'
    }

    return statusColorClass;
  }

  pageChanged(event: any) {
    this.page = event;
    this.fetchData();
  }

  refresh() {
    this.fetchData();
    window.location.reload();
  }

  fetchData() {
    this.userService.getAllBookings().subscribe(
      (res) => {
        console.log(res)
        this.listDatauser = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }


}
