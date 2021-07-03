import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorAdddrugComponent } from './doctor-adddrug/doctor-adddrug.component';
import { DoctorAddtreatComponent } from './doctor-addtreat/doctor-addtreat.component';
import { DoctorManagedrugComponent } from './doctor-managedrug/doctor-managedrug.component';
import { DoctorPageComponent } from './doctor-page/doctor-page.component';
import { DoctorPrintdatadrugComponent } from './doctor-printdatadrug/doctor-printdatadrug.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { DoctorReportDatauserComponent } from './doctor-report-datauser/doctor-report-datauser.component';
import { DoctorReporttreatComponent } from './doctor-reporttreat/doctor-reporttreat.component';
import { DoctorTreatComponent } from './doctor-treat/doctor-treat.component';

const routes: Routes = [
  {path: '', component: DoctorPageComponent},
  {path: 'home', component: DoctorPageComponent},
  {path: 'profile', component: DoctorProfileComponent},
  {path: 'treat', component: DoctorTreatComponent},
  {path: 'managedrug', component: DoctorManagedrugComponent},
  {path: 'treat/add-treat', component: DoctorAddtreatComponent},
  {path: 'treat/add-drug', component: DoctorAdddrugComponent},
  {path: 'treat/add-drug/printdatadrug', component: DoctorPrintdatadrugComponent},
  {path: 'report-treat', component: DoctorReporttreatComponent},
  {path: 'report-treat/report-datauser', component: DoctorReportDatauserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
