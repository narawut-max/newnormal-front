import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-adddrug',
  templateUrl: './doctor-adddrug.component.html',
  styleUrls: ['./doctor-adddrug.component.css']
})
export class DoctorAdddrugComponent implements OnInit {

  listDatadrugs = [
    {
      "drugId": "001214",
      "drugName": "ยา",
      "drugTrademark": "SISALON 50",
      "drugActive": "เหลือ",
      "drugMfg": "2021-04-01",
      "drugExp": "2021-04-01",
      "drugPrice": 30.0000,
      "drugAmount": "5",
      "ctgId": "1"
    },
    {
      "drugId": "002124",
      "drugName": "พารา",
      "drugTrademark": "SISALON 50",
      "drugActive": "ไม่เหลือ",
      "drugMfg": "2021-04-01",
      "drugExp": "2021-04-01",
      "drugPrice": 40.0000,
      "drugAmount": "0",
      "ctgId": "1"
    }
  ]
  
  constructor() { }

  ngOnInit(): void {
  }

  selectdatadrug() {
    Swal.fire('ข้อมูลยา')
  }

  gotoprintdrug() {
    Swal.fire({
      title: 'ต้องการยืนยันหรือไม่ ?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'บันทึกข้อมูลสำเร็จ!',
          '',
          'success'
        )
      }
    })
  }




}
