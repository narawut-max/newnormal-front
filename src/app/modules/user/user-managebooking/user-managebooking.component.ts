import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-managebooking',
  templateUrl: './user-managebooking.component.html',
  styleUrls: ['./user-managebooking.component.css']
})
export class UserManagebookingComponent implements OnInit {

  listDatauser = [
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

  cancelbooking() {
    Swal.fire({
      title: 'ยกเลิกการจองหรือไม่ ?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'ยกเลิกการจองสำเร็จ!',
          '',
          'success'
        )
      }
    })
  }

}
