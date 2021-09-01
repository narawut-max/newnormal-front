import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor-reporttreat',
  templateUrl: './doctor-reporttreat.component.html',
  styleUrls: ['./doctor-reporttreat.component.css']
})
export class DoctorReporttreatComponent implements OnInit {

  listDatatreat !: any;

  userId: string | any
  userHnId: string | any
  userCardId: string | any
  userFirstname: string | any
  userLastname: string | any

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private doctorService: DoctorService
  ) { }

  listDatatreats = this.fb.group({
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
  }

  refresh() {
    this.fetchData();
    window.location.reload();
  }

  fetchData() {
    this.doctorService.getUserByRoleId(2).subscribe(
      (res) => {
        console.log(res)
        this.listDatatreat = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  gotoAdminEdit(item: any) {
    debugger
    this.router.navigate(['doctor/report-treat/report-datauser', item.userId]);
  }

  SearchUserByCriteria() {
    debugger
    let resp = this.doctorService.getSearchUserByCriteria(this.userId, this.userHnId, this.userCardId, this.userFirstname, this.userLastname);
    resp.subscribe((data) => this.listDatatreat = data);
  }
}
