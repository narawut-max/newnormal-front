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

  formValue !: FormGroup;
  listDatauser !: any;
  item: any
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  listDatausers = this.fb.group({
    tmId: [''],
    userId: [''],
    bkId: [''],
    userFirstname: [''],
    userLastname: [''],
    userPhone: [''],
    userEmail: [''],
    userDisease: [''],
    bkQueue: [''],
    bkDate: [''],
    bkTime: [''],
    bkSymptom: [''],
    user: {
      userId: [''],
      userFirstname: [''],
      userLastname: [''],
      userPhone: [''],
      userEmail: [''],
      userDisease: [''],
    },
    booking: {
      bkId: [''],
      bkQueue: [''],
      bkDate: [''],
      bkTime: [''],
      bkSymptom: [''],
    }
  });

  ngOnInit(): void {
    this.fetchData();
    this.formValue = this.listDatausers;
  }

  refresh() {
    this.fetchData();
    window.location.reload();
  }

  fetchData() {
    this.userService.getAllTreatment().subscribe(
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
