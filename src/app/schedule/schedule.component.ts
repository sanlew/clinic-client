import { Component, OnInit } from '@angular/core';
import { Event } from '../models/event';




@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
 
})
export class ScheduleComponent implements OnInit {

    daysOfWeek:string[] = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    daysOfWeekLarge:string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    currentWeek:Date[];
    hoursOfDay:number[] = [];
    date:Date;
    startWeek:Date;
    
    startTime:number = 6;
    endTime:number=21;




  constructor() { }

  ngOnInit() {
      this.initHoures();
      this.date = new Date();
      this.startWeek= this.addDays(this.date, this.date.getDay()-1);
    
      this.reloadCurrentWeek();
  }
  
  nextWeek(){
      this.startWeek= this.addDays(this.startWeek, 7);
      this.reloadCurrentWeek();
     
  }
  
  backWeek(){
      this.startWeek= this.addDays(this.startWeek, -7);
      this.reloadCurrentWeek();
  }


initHoures(){
   for(var i=this.startTime; i<=this.endTime; i++){
       this.hoursOfDay.push(i);
   }
}
   
reloadCurrentWeek(){
   this.currentWeek = [];
   var dateIterator = this.startWeek;
   
   for(var i=0; i<7; i++){
       this.currentWeek.push(dateIterator);
       dateIterator = this.addDays(dateIterator, 1);
       
   }
}
addDays(startDate, numberOfDays) {
   return new Date(startDate.getTime() + (numberOfDays * 24 *60 * 60 * 1000));
   }  
 
}
