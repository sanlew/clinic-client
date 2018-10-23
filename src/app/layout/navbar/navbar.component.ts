import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Observable } from "rxjs";
import { LoginComponent } from '../../account/login/login.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    username: Observable<string>;
    isLoggedIn : Observable<boolean>;

@Input() loginComponent: LoginComponent;


constructor(private accountService: AccountService, private router: Router) {
    this.isLoggedIn = accountService.isLoggedIn();
    this.username = accountService.getUsername();
}

  ngOnInit() {};
  
 showLoginModal(){
     this.loginComponent.showLoginModal();
 }
  
  logout(): void {
     this.accountService.logout(); 
    }
  
  login(){};
  
goTo(component:any[]){
	this.router.navigate(component);
}

}
