import { Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { UserDTO } from '../models/userDTO';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from '../../environments/environment';


@Injectable()
export class AccountService {
    
   isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
   usernameSubject = new BehaviorSubject<string>(this.getLogin());

  constructor(private http: Http, private router: Router, private httpClient: HttpClient) { }
  
  url: string;
  headers: Headers;
  options: RequestOptions;
  cred: string;
  curentUser: string;
  

  isLoggedIn() : Observable<boolean> {
      return this.isLoginSubject.asObservable();
  }
  
  getUsername() : Observable<string> {
      return this.usernameSubject.asObservable();
  } 

 updateUserInfo(): Observable<any>{
  this.headers = new Headers({
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.getToken()
        });
      this.options = new RequestOptions({ headers: this.headers });
      return this.http.get(`${environment.baseApiUrl}` + `/api/users/me`, this.options)
.pipe(map(res => res.json()));
	 
  } 
 

  login(user: UserDTO) {
     
      this.headers = new Headers({
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": "Basic " + btoa(environment.clientId+':'+environment.clientSecret)
        });
      this.options = new RequestOptions({ headers: this.headers });
      this.cred = "username=" + user.email + "&password=" + user.password + "&grant_type=password";
      return this.http.post(environment.authUrl, this.cred, this.options)
      .pipe(map(res => {
      localStorage.setItem('currentUser', JSON.stringify({userName:user.email, token: res.json().access_token}));
      this.router.navigateByUrl("/panel");
      this.isLoginSubject.next(true);
      this.usernameSubject.next(JSON.parse(localStorage.getItem('currentUser')).userName);
      return res;
      }));
  }
        
   createNewUser( user: UserDTO, response: any) {
	    const params = new HttpParams()
	    .set('response', response);
            return this.httpClient.post(`${environment.baseApiUrl}` + `/api/users/new`, user, {params});
        }
          
 
  logout(){
      localStorage.removeItem('currentUser');
      this.isLoginSubject.next(false);
      this.usernameSubject.next('');
      this.router.navigateByUrl("/");
  }

 
  private hasToken(): boolean {
      return !!localStorage.getItem('currentUser');
  }
  
  private getLogin(): string{
      if(this.hasToken()){
         return JSON.parse(localStorage.getItem('currentUser')).userName;
      }
      return '';
  }

private getToken(): string{
      if(this.hasToken()){
         return JSON.parse(localStorage.getItem('currentUser')).token;
      }
      return '';
  }

  
}
