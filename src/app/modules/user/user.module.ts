import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserPageComponent } from './user-page/user-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserBookingComponent } from './user-booking/user-booking.component';



@NgModule({
  declarations: [UserPageComponent, UserBookingComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgxPaginationModule
  ]
})
export class UserModule { }
