import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-manage',
  templateUrl: './admin-manage.component.html',
  styleUrls: ['./admin-manage.component.css']
})
export class AdminManageComponent implements OnInit {
  
  listUser: any;
  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [3, 6, 9, 12];

  listDatas = [
    {
      "userId": "1",
      "userUsername": "user1",
      "userPassword": "NkC+KxcQlUmW8/LYuiSMvmcBnSkQcmDu",
      "userCardId": "1578555522236",
      "userTitle": "นาย",
      "userFirstname": "อำนาจ",
      "userLastname": "มหานคร",
      "userGender": "ชาย",
      "userBirthday": "0000-00-00",
      "userBlood": "",
      "userDisease": "",
      "userAllergy": null,
      "userDepartment": "",
      "userGraduate": "",
      "userProfession": null,
      "userPosition": "",
      "userPhone": null,
      "userEmail": "",
      "userStatus": "",
      "userAddrass": "",
      "zipCode": "",
      "roleId": ""
    },
    {
      "userId": "2",
      "userUsername": "user2",
      "userPassword": "NkC+KxcQlUmW8/LYuiSMvmcBnSkQcmDu",
      "userCardId": "1547855545598",
      "userTitle": "นางสาว",
      "userFirstname": "นวล",
      "userLastname": "ศรี",
      "userGender": "หญิง",
      "userBirthday": "0000-00-00",
      "userBlood": "",
      "userDisease": "",
      "userAllergy": null,
      "userDepartment": "",
      "userGraduate": "",
      "userProfession": null,
      "userPosition": "",
      "userPhone": null,
      "userEmail": "",
      "userStatus": "",
      "userAddrass": "",
      "zipCode": "",
      "roleId": ""
    },
    {
      "userId": "3",
      "userUsername": "user3",
      "userPassword": "NkC+KxcQlUmW8/LYuiSMvmcBnSkQcmDu",
      "userCardId": "1478555598874",
      "userTitle": "นาย",
      "userFirstname": "วรามัย",
      "userLastname": "ตาสัง",
      "userGender": "ชาย",
      "userBirthday": "0000-00-00",
      "userBlood": "",
      "userDisease": "",
      "userAllergy": null,
      "userDepartment": "",
      "userGraduate": "",
      "userProfession": null,
      "userPosition": "",
      "userPhone": null,
      "userEmail": "",
      "userStatus": "",
      "userAddrass": "",
      "zipCode": "",
      "roleId": ""
    },
    {
      "userId": "4",
      "userUsername": "user4",
      "userPassword": "Jt01IHebfJlPZmQkIS3Vb5UbHsVWDRgG",
      "userCardId": "1785422202256",
      "userTitle": "นาย",
      "userFirstname": "สมชาย",
      "userLastname": "นิลกาล",
      "userGender": "ชาย",
      "userBirthday": "",
      "userBlood": "O",
      "userDisease": "",
      "userAllergy": "",
      "userDepartment": "",
      "userGraduate": "",
      "userProfession": "",
      "userPosition": "",
      "userPhone": "",
      "userEmail": "",
      "userStatus": "",
      "userAddrass": "",
      "zipCode": "",
      "roleId": "1"
    }
  ];

  constructor(
    private adminService: AdminService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  refresh() {
    this.fetchUsers();
    window.location.reload();
  }

  fetchUsers() {
    this.adminService.getAllUsers().subscribe(
      (res) => {
        console.log(res)
        this.listUser = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  pageChanged(event: any) {
    this.page = event;
    this.fetchUsers();
  }

  gotoAdminEdit(item: any) {
    debugger
    this.router.navigate(['admin/manage/edit', item.roleId , item.userId]);
  }

  deleteUser(item: any) {
    Swal.fire({
      title: 'ต้องการลบข้อมูล?',
      text: "ลบข้อมูลของ : " + item.userFirstname,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ลบข้อมูล'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteUserByUserId(item.userId).subscribe(
          (res) => {
            console.log(res);
            Swal.fire('เรียบร้อย!', 'คุณได้ทำการลบข้อมูลผู้ใช้งานเรียบร้อย', 'success');
            setTimeout(function () { window.location.reload(); }, 2 * 1000);
          },
          (error) => {
            console.log('delete User error : ', error);
          }
        );
      }
    })




  }

}
