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
  
  constructor(
    private adminService: AdminService,
    private router: Router,
  ) { }

  listUser: any;
  searchText: any;
  
  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [3, 6, 9, 12];

  listDatas = [{}];

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
    this.router.navigate(['admin/manage/edit/role:'+item.roleId , item.userId]);
  }

  deleteUser(item: any) {
    console.log('data :', this.listUser.value)
    Swal.fire({
      title: 'ต้องการลบข้อมูล?',
      text: "ลบข้อมูลของ : " + item.userFirstname,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ลบข้อมูล',
      cancelButtonText: 'ยกเลิก'
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

  // โค้ดจัดเรียง
  // key: string = 'roleDescription';
  // reverse: boolean = false;
  // sort(key: string) {
  //   this.key = key;
  //   this.reverse = !this.reverse;
  // }

}//end
