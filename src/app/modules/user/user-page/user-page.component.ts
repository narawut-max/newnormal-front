import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  searchText: any;
  listDatauser: any;
  item: any

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  // page = 1;
  // count = 0;
  // tableSize = 10;
  // tableSizes = [3, 6, 9, 12];
  
  listDatausers = this.fb.group({
    tmId: [''],
    userId: [''],
    bkId: [''],
    userHnId: [''],
    userFirstname: [''],
    userLastname: [''],
    userPhone: [''],
    userEmail: [''],
    userDisease: [''],
    userDepartment: [''],
    bkQueue: [''],
    bkDate: [''],
    bkTime: [''],
    bkSymptom: [''],
    user: {},
    booking: {}
  });

  ngOnInit(): void {
    this.fetchData();
  }

  refresh() {
    this.fetchData();
    window.location.reload();
  }

  fetchData() {
    this.userService.getAllBookings().subscribe(
      (res) => {
        console.log(res)
        this.listDatauser = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }


}
