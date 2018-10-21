import { HomeComponent } from './home/home.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { PanelComponent } from './patient/panel/panel.component';
import { VisitsComponent } from './patient/visits/visits.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ErrorComponent } from './layout/error/error.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

const clinicRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'panel', component: PanelComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'error', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(clinicRoutes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})


export class AppRoutingModule { }
