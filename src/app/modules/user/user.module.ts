import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserPageComponent } from './user-page/user-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserBookingComponent } from './user-booking/user-booking.component';
import { UserManagebookingComponent } from './user-managebooking/user-managebooking.component';
import { UserSelectbookingComponent } from './user-selectbooking/user-selectbooking.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserUploaddatamoneyComponent } from './user-uploaddatamoney/user-uploaddatamoney.component';



@NgModule({
  declarations: [UserPageComponent, UserBookingComponent, UserManagebookingComponent, UserSelectbookingComponent, UserProfileComponent, UserUploaddatamoneyComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgxPaginationModule
  ]
})
export class UserModule { }
