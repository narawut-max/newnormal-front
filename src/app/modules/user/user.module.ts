import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserPageComponent } from './user-page/user-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserBookingComponent } from './user-booking/user-booking.component';
import { UserManagebookingComponent } from './user-managebooking/user-managebooking.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserUploaddatamoneyComponent } from './user-uploaddatamoney/user-uploaddatamoney.component';
import { DayService, MonthAgendaService, MonthService, RecurrenceEditorModule, ScheduleModule, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction';

FullCalendarModule.registerPlugins([ 
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [UserPageComponent, UserBookingComponent, UserManagebookingComponent, UserProfileComponent, UserUploaddatamoneyComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    ScheduleModule, RecurrenceEditorModule,
    Ng2SearchPipeModule,
    FormsModule,
    FullCalendarModule
  ],
  providers: [DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService],
})
export class UserModule { }
