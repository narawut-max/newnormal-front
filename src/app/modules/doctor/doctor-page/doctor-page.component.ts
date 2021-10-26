import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor-page',
  templateUrl: './doctor-page.component.html',
  styleUrls: ['./doctor-page.component.css']
})
export class DoctorPageComponent implements OnInit {

  isShow: boolean = false;
  bkIdForUpdateStatus: any;

  page = 1;
  count = 0;
  tableSize = 5;
  tableSizes = [3, 6, 9, 12];

  searchText: any;
  listDatauser : any;
  item: any
  bkId: any
  bk_id_param: any
  currentDate = new Date();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private doctorService: DoctorService,
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
    bkQueue: [''],
    bkDate: [''],
    bkTime: [''],
    bkSymptom: [''],
    bkDepartment: [''],
    user: {},
    booking: {}
  });

  ngOnInit(): void {
    // this.bkId = this.activatedroute.snapshot.paramMap.get("bkId");
    // const bkId = sessionStorage.getItem('user_bkId');
    this.fetchData();
  }

  // refresh(userDepartment: any) {
  //   this.fetchData(userDepartment);
  //   window.location.reload();
  // }

  fetchData() {
    const bkDepartment = sessionStorage.getItem('user_department');
    this.doctorService.getbookingBydepartment(bkDepartment).subscribe(
      (res) => {
        console.log(res)
        this.listDatauser = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }


  selectDataBooking(item: any) {
    debugger
    this.listDatausers.controls['bkId'].patchValue(item.bkId);
    this.listDatausers.controls['tmId'].patchValue(item.tmId);
    this.listDatausers.controls['userId'].patchValue(item.userId);
    this.listDatausers.controls['userHnId'].patchValue(item.user.userHnId);
    this.listDatausers.controls['userFirstname'].patchValue(item.user.userFirstname);
    this.listDatausers.controls['userLastname'].patchValue(item.user.userLastname);
    this.listDatausers.controls['userPhone'].patchValue(item.user.userPhone);
    this.listDatausers.controls['userEmail'].patchValue(item.user.userEmail);
    this.listDatausers.controls['userDisease'].patchValue(item.user.userDisease);
    this.listDatausers.controls['bkQueue'].patchValue(item.bkQueue);
    this.listDatausers.controls['bkDate'].patchValue(item.bkDate);
    this.listDatausers.controls['bkTime'].patchValue(item.bkTime);
    this.listDatausers.controls['bkSymptom'].patchValue(item.bkSymptom);
    this.listDatausers.controls['bkDepartment'].patchValue(item.bkDepartment);
    // const bkId = item.bkId;
    this.bk_id_param = item.bkId;

    if (item.bkStatus != 'C' && item.bkStatus != 'S') {
      this.isShow = true;
    }
  }

  gotoUpdateStatusBooking(item: any) {
    debugger
    this.bkIdForUpdateStatus = item.bkId;
    console.log(item);
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
      statusDesc = 'ข้ามคิว'
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
      statusColorClass = 'bg-primary'
    }

    return statusColorClass;
  }

  updateStatusBooking(bkStatus: any) {
    console.log('updateStatusBooking : bkStatus: ' + bkStatus + ', bkId:' + this.bkIdForUpdateStatus);
    this.userService.updateBookingStatusByBkId(this.bkIdForUpdateStatus, bkStatus).subscribe(
      res => {
        console.log("updateStatusBooking res ::", res);
        this.fetchData();
      }
    );
   
  }

  gotoaddtreat(item: any) {
    debugger
    // const bkId = item.bkId;
    this.router.navigate(['doctor/treat/add-treat' , + this.bk_id_param]);
  }

  pageChanged(event: any) {
    this.page = event;
    // this.fetchData(bkDepartment);
  }
  
}
