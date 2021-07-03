import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor-treat',
  templateUrl: './doctor-treat.component.html',
  styleUrls: ['./doctor-treat.component.css']
})
export class DoctorTreatComponent implements OnInit {

  listDatauser = [
    {
      "tmId": "1",
      "tmDate": "2021-03-31",
      "tmTime": "16:23:47",
      "tmMoney": 440.0000,
      "tmSlip": "loyfj.jpg",
      "tmStatus": "ชำระแล้ว",
      "userId": "0012",
      "bkId": 11,
      "billId": 2
  },
  {
      "tmId": "2",
      "tmDate": "2021-03-31",
      "tmTime": "16:23:56",
      "tmMoney": 555.0000,
      "tmSlip": "putgg.jpg",
      "tmStatus": "ยังไม่ชำระ",
      "userId": "0012",
      "bkId": 12,
      "billId": 2
  }
  ]

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
