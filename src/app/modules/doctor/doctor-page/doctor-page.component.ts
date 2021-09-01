import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor-page',
  templateUrl: './doctor-page.component.html',
  styleUrls: ['./doctor-page.component.css']
})
export class DoctorPageComponent implements OnInit {

  listDatauser : any;
  item: any

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private doctorService: DoctorService
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
    user: {},
    booking: {}
  });

  ngOnInit(): void {
    this.fetchData();
    const userDepartment = sessionStorage.getItem('user_department');
  }

  refresh() {
    this.fetchData();
    window.location.reload();
  }

  fetchData() {
    this.doctorService.getAllTreatment().subscribe(
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
    this.listDatausers.controls['tmId'].patchValue(item.tmId);
    this.listDatausers.controls['userId'].patchValue(item.userId);
    this.listDatausers.controls['userHnId'].patchValue(item.user.userHnId);
    this.listDatausers.controls['userFirstname'].patchValue(item.user.userFirstname);
    this.listDatausers.controls['userLastname'].patchValue(item.user.userLastname);
    this.listDatausers.controls['userPhone'].patchValue(item.user.userPhone);
    this.listDatausers.controls['userEmail'].patchValue(item.user.userEmail);
    this.listDatausers.controls['userDisease'].patchValue(item.user.userDisease);
    this.listDatausers.controls['bkId'].patchValue(item.booking.bkId);
    this.listDatausers.controls['bkQueue'].patchValue(item.booking.bkQueue);
    this.listDatausers.controls['bkDate'].patchValue(item.booking.bkDate);
    this.listDatausers.controls['bkTime'].patchValue(item.booking.bkTime);
    this.listDatausers.controls['bkSymptom'].patchValue(item.booking.bkSymptom);
  }

  gotoaddtreat(item: any) {
    debugger
    this.router.navigate(['doctor/treat/add-treat' , item.tmId]);
  }
}
