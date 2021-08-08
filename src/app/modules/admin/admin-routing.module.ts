import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminEditdoctorComponent } from './admin-editdoctor/admin-editdoctor.component';
import { AdminEdituserComponent } from './admin-edituser/admin-edituser.component';
import { AdminManageComponent } from './admin-manage/admin-manage.component';
import { AdminManagemoneyComponent } from './admin-managemoney/admin-managemoney.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';

const routes: Routes = [
  {path: '', component: AdminPageComponent},
  {path: 'home', component: AdminPageComponent},
  {path: 'register', component: AdminRegisterComponent},
  {path: 'manage', component: AdminManageComponent},
  {path: 'managemoney', component: AdminManagemoneyComponent},
  // {path: 'manage/edit/:userId', component: AdminEditdoctorComponent},
  {path: 'manage/edit/role:2/:userId', component: AdminEdituserComponent},
  {path: 'manage/edit/role:3/:userId', component: AdminEditdoctorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
