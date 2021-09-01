import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor-treat',
  templateUrl: './doctor-treat.component.html',
  styleUrls: ['./doctor-treat.component.css']
})
export class DoctorTreatComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private doctorService: DoctorService
  ) { }

  listUser: any;
  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [3, 6, 9, 12];

  listDatausers = [{}];

  bkId: string | any
  userHnId: string | any
  userCardId: string | any
  userFirstname: string | any
  userLastname: string | any

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
        this.listUser = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  gotoaddtreat(item: any) {
    debugger
    this.router.navigate(['doctor/treat/add-treat/', item.tmId]);
  }

  getSearchTreatByCriteria() {
    debugger
    let resp = this.doctorService.searchTreatByCriteria(this.bkId, this.userHnId, this.userCardId, this.userFirstname, this.userLastname);
    resp.subscribe((data)=> this.listUser = data);
  }
}
