import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeLoginComponent } from './home-login/home-login.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeRegisterComponent } from './home-register/home-register.component';



@NgModule({
  declarations: [HomePageComponent, HomeLoginComponent, HomeRegisterComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
