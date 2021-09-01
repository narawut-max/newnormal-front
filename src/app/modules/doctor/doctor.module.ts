import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorPageComponent } from './doctor-page/doctor-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DoctorTreatComponent } from './doctor-treat/doctor-treat.component';
import { DoctorAddtreatComponent } from './doctor-addtreat/doctor-addtreat.component';
import { DoctorAdddrugComponent } from './doctor-adddrug/doctor-adddrug.component';
import { DoctorReporttreatComponent } from './doctor-reporttreat/doctor-reporttreat.component';
import { DoctorPrintdatadrugComponent } from './doctor-printdatadrug/doctor-printdatadrug.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { DoctorManagedrugComponent } from './doctor-managedrug/doctor-managedrug.component';
import { DoctorReportDatauserComponent } from './doctor-report-datauser/doctor-report-datauser.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClientModule } from '@angular/common/http';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';



@NgModule({
  declarations: [DoctorPageComponent, DoctorTreatComponent, DoctorAddtreatComponent, DoctorAdddrugComponent, DoctorReporttreatComponent,DoctorPrintdatadrugComponent, DoctorProfileComponent, DoctorManagedrugComponent, DoctorReportDatauserComponent],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    FormsModule,
    HttpClientModule,
    ShowHidePasswordModule,
  ]
})
export class DoctorModule { }
