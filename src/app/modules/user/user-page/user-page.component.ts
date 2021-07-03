import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  listDatas = [
    {
      "tmId": "1",
      "tmDate": "2021-03-31",
      "tmTime": "15:49:51",
      "tmMoney": 440.0000,
      "tmSlip": "loyfj.jpg",
      "tmStatus": "ชำระแล้ว",
      "userId": "0012",
      "bkId": 23,
      "billId": 2
    },
    {
      "tmId": "2",
      "tmDate": "2021-03-31",
      "tmTime": "15:49:56",
      "tmMoney": 555.0000,
      "tmSlip": "putgg.jpg",
      "tmStatus": "ยังไม่ชำระ",
      "userId": "0012",
      "bkId": 24,
      "billId": 2
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
