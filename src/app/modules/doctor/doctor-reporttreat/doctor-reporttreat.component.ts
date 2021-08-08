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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private doctorService: DoctorService
  ) { }

  listDatatreats = this.fb.group({
    tmId: [''],
    userId: [''],
    bkId: [''],
    userFirstname: [''],
    userLastname: [''],
    userPhone: [''],
    userEmail: [''],
    userDisease: [''],
    bkQueue: [''],
    bkDate: [''],
    bkTime: [''],
    bkSymptom: [''],
    user: {
      userId: [''],
      userFirstname: [''],
      userLastname: [''],
      userPhone: [''],
      userEmail: [''],
      userDisease: [''],
    },
    booking: {
      bkId: [''],
      bkQueue: [''],
      bkDate: [''],
      bkTime: [''],
      bkSymptom: [''],
    }
  });
  
  ngOnInit(): void {
    this.fetchData();
  }

  refresh() {
    this.fetchData();
    window.location.reload();
  }

  fetchData() {
    this.doctorService.getAllTreatment().subscribe(
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
    this.router.navigate(['doctor/report-treat/report-datauser' , item.tmId]);
  }
}
