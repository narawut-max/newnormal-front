import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorAdddrugComponent } from './doctor-adddrug/doctor-adddrug.component';
import { DoctorAddtreatComponent } from './doctor-addtreat/doctor-addtreat.component';
import { DoctorDatabookingComponent } from './doctor-databooking/doctor-databooking.component';
import { DoctorPageComponent } from './doctor-page/doctor-page.component';
import { DoctorReporttreatComponent } from './doctor-reporttreat/doctor-reporttreat.component';
import { DoctorTreatComponent } from './doctor-treat/doctor-treat.component';

const routes: Routes = [
  {path: '', component: DoctorPageComponent},
  {path: 'home', component: DoctorPageComponent},
  {path: 'treat', component: DoctorTreatComponent},
  {path: 'databooking', component: DoctorDatabookingComponent},
  {path: 'treat/add-treat', component: DoctorAddtreatComponent},
  {path: 'treat/add-drug', component: DoctorAdddrugComponent},
  {path: 'report-treat', component: DoctorReporttreatComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
