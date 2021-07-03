import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-uploaddatamoney',
  templateUrl: './user-uploaddatamoney.component.html',
  styleUrls: ['./user-uploaddatamoney.component.css']
})
export class UserUploaddatamoneyComponent implements OnInit {

  listDatas = [
    {
      "tmId": "1",
      "tmDate": "2021-03-31",
      "tmTime": "15:49:51",
      "tmMoney": 440.0000,
      "tmSlip": "loyfj.jpg",
      "tmStatus": "ชำระแล้ว",
      "userId": "0012",
      "bkId": 1,
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
      "bkId": 1,
      "billId": 2
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

  uploadmoney() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    Swal.fire({
      title: 'อัปโหลดหลักฐานการชำระเงิน',
      input: 'file',
      inputAttributes: {
        'accept': 'image/*',
        'aria-label': 'Upload your profile picture'
      },
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#d33',
      confirmButtonText: 'บันทึกข้อมูล',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'บันทึกข้อมูลสำเร็จ',
          'โปรดแจ้งแพทย์เมื่อชำระเงินเสร็จสิ้น',
          'success'
        )
      }
    })
  }

  selectslipmoney() {
    Swal.fire({
      imageUrl: 'https://obs.line-scdn.net/0hd_rioZEKO3BPEBPqvuFEJ3VGOB98fChzKyZqcxN-ZUQ2dylxISZzHmxFYElqKXwuISJwHm0SIEEwIiwlcX5z/w644',
      imageWidth: 400,
      imageHeight: 500,
      imageAlt: 'Custom image',
    })
  }

}
