import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorPageComponent } from './doctor-page/doctor-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DoctorTreatComponent } from './doctor-treat/doctor-treat.component';
import { DoctorAddtreatComponent } from './doctor-addtreat/doctor-addtreat.component';
import { DoctorAdddrugComponent } from './doctor-adddrug/doctor-adddrug.component';
import { DoctorReporttreatComponent } from './doctor-reporttreat/doctor-reporttreat.component';



@NgModule({
  declarations: [DoctorPageComponent, DoctorTreatComponent, DoctorAddtreatComponent, DoctorAdddrugComponent, DoctorReporttreatComponent],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    NgxPaginationModule
  ]
})
export class DoctorModule { }
