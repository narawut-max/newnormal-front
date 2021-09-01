import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { AdminManageComponent } from './admin-manage/admin-manage.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminEdituserComponent } from './admin-edituser/admin-edituser.component';
import { AdminEditdoctorComponent } from './admin-editdoctor/admin-editdoctor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminManagemoneyComponent } from './admin-managemoney/admin-managemoney.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminEditadminComponent } from './admin-editadmin/admin-editadmin.component';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [AdminPageComponent,
    AdminRegisterComponent,
    AdminManageComponent,
    AdminManagemoneyComponent,
    AdminEdituserComponent,
    AdminEditdoctorComponent,
    AdminProfileComponent,
    AdminEditadminComponent],

  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    FormsModule
  ]
})
export class AdminModule { }
