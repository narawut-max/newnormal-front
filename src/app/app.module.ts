import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './modules/login/login.component';
import { DayService, MonthAgendaService, MonthService, RecurrenceEditorModule, ScheduleModule, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPermissionsModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    ScheduleModule,RecurrenceEditorModule, NgbModule, CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    BrowserAnimationsModule,
    
    
  ],
  providers: [DayService,WeekService,WorkWeekService,MonthService,MonthAgendaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
