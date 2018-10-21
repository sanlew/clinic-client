import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../../models/doctor';
import { Specialization } from '../../models/specialization';
import { HomeService } from '../../services/home.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-schedule-search-form',
  templateUrl: './schedule-search-form.component.html',
  styleUrls: ['./schedule-search-form.component.scss']
})
export class ScheduleSearchFormComponent implements OnInit {

specializations: Observable<Specialization[]>;
selectedSpecialization: Specialization;
doctors: Observable<Doctor[]>;
selectedDoctor: Doctor;


constructor(private homeService: HomeService, private router: Router) { }

ngOnInit() {
    this.reloadData();
}


reloadData() {
    this.specializations = this.homeService.getSpecializationsList();
  
}

getDoctorsBySpecialization(){
    this.doctors = this.homeService.getDoctorsBySpecialization(this.selectedSpecialization.id);
}

search(){
	  this.router.navigateByUrl("/schedule");
}



}
