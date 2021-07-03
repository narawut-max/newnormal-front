import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-page',
  templateUrl: './doctor-page.component.html',
  styleUrls: ['./doctor-page.component.css']
})
export class DoctorPageComponent implements OnInit {

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
      "billId": 3
  }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
