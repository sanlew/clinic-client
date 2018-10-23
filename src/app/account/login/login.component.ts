import { Component,OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UserDTO } from '../../models/userDTO';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { Observable, Subscription} from "rxjs";
import { ModalDirective } from 'angular-bootstrap-md';
import { AlertService } from '../../services/alert.service';



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy{
    
  user:UserDTO;
  submited = false;
  message: any;
  subscription: Subscription;


  @ViewChild('loginModal') loginModal: ModalDirective;
  
 
  
  constructor(private http: Http, private router: Router,private accountService: AccountService, 
          private alertService: AlertService)  {
      
      this.subscription = this.alertService.getMessage().subscribe(message => { this.message = message; });
  }
    
    ngOnInit() {
    localStorage.removeItem('currentUser');
    this.user = new UserDTO();
    
  } 
    
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
  
  
  onSubmit() {
    this.submited = true;
    this.accountService.login(this.user)
    .pipe()
    .subscribe(
        data => {
            this.closeLoginModal();
        },
        error => {
            this.alertService.sendMessage("Incorrect login or password");
            console.log('Incorrect login or password', error); 
        });

}
    

  closeLoginModal(){
      this.loginModal.hide();
      this.user = new UserDTO();
      this.submited = false;
  }
  
  showLoginModal() {
      this.loginModal.show();
  }
}
