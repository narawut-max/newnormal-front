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
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [DoctorPageComponent, DoctorTreatComponent, DoctorAddtreatComponent, DoctorAdddrugComponent, DoctorReporttreatComponent,DoctorPrintdatadrugComponent, DoctorProfileComponent, DoctorManagedrugComponent, DoctorReportDatauserComponent],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ]
})
export class DoctorModule { }
