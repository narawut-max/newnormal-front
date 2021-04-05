import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLoginComponent } from './home-login/home-login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeRegisterComponent } from './home-register/home-register.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'login', component: HomeLoginComponent},
  {path: 'register', component: HomeRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
