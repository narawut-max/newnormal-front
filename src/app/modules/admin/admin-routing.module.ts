import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { AdminManageComponent } from './admin-manage/admin-manage.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';

const routes: Routes = [
  {path: '', component: AdminPageComponent},
  {path: 'admin-home', component: AdminPageComponent},
  {path: 'register', component: AdminRegisterComponent},
  {path: 'manage', component: AdminManageComponent},
  {path: 'edit/:userId', component: AdminEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
