import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('userId');
    console.log('userId : ', userId);
    this.initUserDataforEdit(userId);
  }

  initUserDataforEdit(userId: any) {
    this.adminService.getUserByUserId(userId).subscribe(
      (res) => {
        console.log('initUserDataforEdit : ', res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
