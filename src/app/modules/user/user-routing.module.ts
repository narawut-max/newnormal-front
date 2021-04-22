import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserBookingComponent } from './user-booking/user-booking.component';
import { UserPageComponent } from './user-page/user-page.component';

const routes: Routes = [
  {path: '', component: UserPageComponent},
  {path: 'home', component: UserPageComponent},
  {path: 'booking', component: UserBookingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
