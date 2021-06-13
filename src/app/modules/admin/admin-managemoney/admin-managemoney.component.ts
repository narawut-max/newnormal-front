import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-managemoney',
  templateUrl: './admin-managemoney.component.html',
  styleUrls: ['./admin-managemoney.component.css']
})
export class AdminManagemoneyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
