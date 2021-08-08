import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AdminPageComponent } from './modules/admin/admin-page/admin-page.component';
import { DoctorPageComponent } from './modules/doctor/doctor-page/doctor-page.component';
import { DoctorProfileComponent } from './modules/doctor/doctor-profile/doctor-profile.component';
import { HomePageComponent } from './modules/home/home-page/home-page.component';
import { LoginComponent } from './modules/login/login.component';
import { UserPageComponent } from './modules/user/user-page/user-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomePageComponent},
  { path: 'admin/home', component: AdminPageComponent},
  { path: 'doctor/home', component: DoctorPageComponent},
  { path: 'user/home', component: UserPageComponent},
  {
    path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'ADMIN'
      }
    }
  },
  {
    path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'USER'
      }
    }
  },
  {
    path: 'doctor', loadChildren: () => import('./modules/doctor/doctor.module').then(m => m.DoctorModule),
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'DOCTOR'
      }
    }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
