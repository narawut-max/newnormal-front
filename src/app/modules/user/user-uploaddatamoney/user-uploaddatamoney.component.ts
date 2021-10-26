import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-uploaddatamoney',
  templateUrl: './user-uploaddatamoney.component.html',
  styleUrls: ['./user-uploaddatamoney.component.css']
})
export class UserUploaddatamoneyComponent implements OnInit {

  selectedFiles: any | FileList;
  currentFile: any |File;
  progress = 0;
  message = '';

  fileInfos: any | Observable<any>;

  listDatauser: any;
  item: any
  userId: any
  tmSlip: any | string
  tm_id_param: any

  searchText: any;

  uplodeFile: any | File = null;
  url = "assets/images/upmdids.jpg"

  page = 1;
  count = 0;
  tableSize = 5;
  tableSizes = [3, 6, 9, 12];
  tmId: any | string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private userService: UserService
  ) { }

  DataUserForm = this.fb.group({
    tmId: [0],
    // tmDate: [''],
    // tmTime: [''],
    tmSlip: [''],
    tmStatus: [''],
    billId: [],
  });

  ngOnInit(): void {
    this.tmId = this.activatedroute.snapshot.paramMap.get("tmId");
    const userId = sessionStorage.getItem('user_id');
    // const tmId = sessionStorage.getItem('user_tmId');
    this.fetchData(userId);
    this.fileInfos = this.userService.getFiles();
  }

  isShowUpdateStatus(tmStatus: any) {
    return tmStatus != 'C' && tmStatus != 'S';
  }
  isShowUpdateStatus2(tmStatus: any) {
    return tmStatus == 'C' && tmStatus == 'S';
  }

  refresh() {
    this.fetchData(this.userId);
    window.location.reload();
  }

  fetchData(userId: any) {
    this.userService.gettreatmentsByUserId(userId).subscribe(
      (res) => {
        console.log(res)
        this.listDatauser = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  selectDataBillId(item: any) {
    debugger
    this.DataUserForm.controls['tmId'].patchValue(item.tmId);
    // this.DataUserForm.controls['tmSlip'].patchValue(item.tmSlip);
    this.DataUserForm.controls['tmStatus'].patchValue(item.tmStatus);
    this.DataUserForm.controls['billId'].patchValue(item.billId);
    // this.listDatausers.controls['userDisease'].patchValue(item.user.userDisease);
  }

  onUplodeFile(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      console.log(reader);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
    }
  }

  onUploadSlip(item: any) {
    console.log('data :', this.DataUserForm.value)
    if (this.DataUserForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
        text: '',
      })
    } else {
      Swal.fire({
        title: 'ยืนยันการทำรายการ',
        text: "ต้องการบันทึกข้อมูลหรือไม่ ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#198754',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ปิด'
      }).then((result) => {
        if (result.isConfirmed) {
          // this.tm_id_param = item.tmId;
          this.upload()
          this.DataUserForm.patchValue(
            {
              // tmId: item.tmId,
              tmStatus: 'WC',
              // tmSlip: ''
            }
          )
          console.log('datas :', this.DataUserForm.value)
          this.userService.updateTreatmentStatus(this.DataUserForm.value).subscribe(res => {
            console.log('Update Treat res : ', res)
          });
          Swal.fire({
            icon: 'success',
            title: 'บันทึกข้อมูลสำเร็จ',
            text: '',
            confirmButtonText: 'ปิดหน้าต่าง',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload()
            } else if (result.isDismissed) {
              window.location.reload()

            }
          })
        }
      })
    }
  }


  pageChanged(event: any) {
    this.page = event;
    this.fetchData(this.userId);
  }

  // ***** upload *****
  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress = 0;
  
    this.currentFile = this.selectedFiles.item(0);
    this.userService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          // this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.userService.getFiles();
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });
  
    this.selectedFiles = undefined;
  }
}//end
