import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor'
import { Specialization } from '../models/specialization'
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root',
})

export class HomeService {

  private baseUrl = environment.baseApiUrl + '/api/public';
  
  constructor(private http:HttpClient) { }


  private httpOptions = {
          headers: new HttpHeaders({'Content-Type': 'application/json'})
        };

    
   	getSpecializationsList(): Observable<any> {
   		return this.http.get(`${this.baseUrl}/specializations`);
    }

  
  	getDoctorsList(): Observable<any> {
   		return this.http.get(`${this.baseUrl}/doctors`);
    }
  	
  
  	getDoctorsBySpecialization(idSpecialization: number): Observable<any> {
    		return this.http.get(`${this.baseUrl}/doctors/${idSpecialization}/list`);
  	}
 

}
