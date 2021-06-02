import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-adddrug',
  templateUrl: './doctor-adddrug.component.html',
  styleUrls: ['./doctor-adddrug.component.css']
})
export class DoctorAdddrugComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
