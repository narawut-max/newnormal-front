import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor-treat',
  templateUrl: './doctor-treat.component.html',
  styleUrls: ['./doctor-treat.component.css']
})
export class DoctorTreatComponent implements OnInit {

  constructor(
    private doctorservice: DoctorService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  gotoaddtreat(item: any){
  debugger
  this.router.navigate(['/doctor/treat/add-treat',item.bkId]);
}

}
