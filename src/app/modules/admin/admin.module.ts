import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { AdminManageComponent } from './admin-manage/admin-manage.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminManagemoneyComponent } from './admin-managemoney/admin-managemoney.component';



@NgModule({
  declarations: [AdminPageComponent, AdminRegisterComponent, AdminManageComponent, AdminEditComponent, AdminManagemoneyComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxPaginationModule
  ]
})
export class AdminModule { }
