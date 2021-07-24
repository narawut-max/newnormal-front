import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { AdminManageComponent } from './admin-manage/admin-manage.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminManagemoneyComponent } from './admin-managemoney/admin-managemoney.component';
import { AdminEdituserComponent } from './admin-edituser/admin-edituser.component';
import { AdminEditdoctorComponent } from './admin-editdoctor/admin-editdoctor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [AdminPageComponent, AdminRegisterComponent, AdminManageComponent, AdminManagemoneyComponent, AdminEdituserComponent, AdminEditdoctorComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
