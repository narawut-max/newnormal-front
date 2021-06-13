import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-managebooking',
  templateUrl: './user-managebooking.component.html',
  styleUrls: ['./user-managebooking.component.css']
})
export class UserManagebookingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  selectdatabooking() {
    Swal.fire('ข้อมูลยา')
  }

}
