import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class HomeModule { }
