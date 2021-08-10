import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserBookingCalenderComponent } from './user-booking-calender/user-booking-calender.component';
import { UserBookingComponent } from './user-booking/user-booking.component';
import { UserManagebookingComponent } from './user-managebooking/user-managebooking.component';
import { UserPageComponent } from './user-page/user-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserUploaddatamoneyComponent } from './user-uploaddatamoney/user-uploaddatamoney.component';

const routes: Routes = [
  {path: '', component: UserPageComponent},
  {path: 'home', component: UserPageComponent},
  {path: 'profile', component: UserProfileComponent},
  {path: 'booking', component: UserBookingComponent},
  {path: 'booking/:tmId', component: UserBookingComponent},
  {path: 'managedata-booking', component: UserManagebookingComponent},
  {path: 'managedata-booking', component: UserManagebookingComponent},
  {path: 'uploaddata-money', component: UserUploaddatamoneyComponent},
  {path: 'booking-calender', component: UserBookingCalenderComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
