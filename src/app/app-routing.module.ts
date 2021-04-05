import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  }, {
    path: 'doctor', loadChildren: () => import('./modules/doctor/doctor.module').then(m => m.DoctorModule)
  }, {
    path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  }, {
    path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
