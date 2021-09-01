import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-uploaddatamoney',
  templateUrl: './user-uploaddatamoney.component.html',
  styleUrls: ['./user-uploaddatamoney.component.css']
})
export class UserUploaddatamoneyComponent implements OnInit {

  listDatauser : any;
  item: any
  
  searchText: any;
  
  page = 1;
  count = 0;
  tableSize = 5;
  tableSizes = [3, 6, 9, 12];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  DataUserForm = this.fb.group({
    tmId: [''],
    tmDate: [''],
    tmTime: [''],
    tmMoney: [''],
    tmSlip: [''],
    tmStatus: [''],
    billId: [],
    bkId: [],
    userId: [],
    userUsername: [''],
    userPassword: [''],
    userCardId: [''],
    userTitle: [''],
    userFirstname: [''],
    userLastname: [''],
    userGender: [''],
    userBirthday: [''],
    userBlood: [''],
    userPhone: [''],
    userEmail: [''],
    userDisease: [''],
    userAddrass: [''],
    userAllergy: [''],
    userStatu: [''],
    roleId: [''],
    bkQueue: [''],
    bkDate: [''],
    bkTime: [''],
    bkSymptom: [''],
    bkProcess: [''],
    zipCode: [''],
    subdistrict: [],
    district: [],
    province: [],
    billDate: [''],
    billTime: ['', Validators.required],
    billNext: ['', Validators.required],
    drugId: [''],
    user: {
      userId: [],
      userUsername: [''],
      userPassword: [''],
      userCardId: [''],
      userTitle: [''],
      userFirstname: [''],
      userLastname: [''],
      userGender: [''],
      userBirthday: [''],
      userBlood: [''],
      userPhone: [''],
      userEmail: [''],
      userDisease: [''],
      userAddrass: [''],
      userAllergy: [''],
      userStatus: [''],
      roleId: [''],
    },
    booking: {
      bkId: [],
      bkQueue: [''],
      bkDate: [''],
      bkTime: [''],
      bkSymptom: [''],
      bkProcess: [''],
    },
    billdrug: {
      billId: [''],
      billDate: ['', Validators.required],
      billTime: ['', Validators.required],
      billNext: [''],
      drugId: [''],
    }
  });

  ngOnInit(): void {
    this.fetchData();
    const userDepartment = sessionStorage.getItem('user_department');
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

  pageChanged(event: any) {
    this.page = event;
    this.fetchData();
  }

}
