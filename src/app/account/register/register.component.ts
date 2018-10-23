import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

declare var grecaptcha: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']

})
export class RegisterComponent implements OnInit {

  	submitted = false;
  	error409 = false;
  	element: HTMLElement;
  	registerForm: FormGroup;
  	namePattern = '^([A-Z]|[a-z]|[śćńżźąóęłŚĆŃŻŹĄÓĘŁ])+$';
  
	
  constructor( private accountService: AccountService, private formBuilder: FormBuilder, private router:Router) { }

  ngOnInit() {
	
    	
	    this.registerForm = this.formBuilder.group({
            firstName: ['', [Validators.required,Validators.maxLength(20), Validators.pattern(this.namePattern)]],
            lastName: ['', [Validators.required,Validators.maxLength(40), Validators.pattern(this.namePattern)]],
            email: ['', [Validators.required, Validators.maxLength(30), Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPass: ['', Validators.required]
          }, {validator: this.validatePass});

	this.addScript();
     
  }
  
  get f() { return this.registerForm.controls; }


 save() {
     
    this.accountService.createNewUser(this.registerForm.value, grecaptcha.getResponse())
    .subscribe(
        data => {
            console.log(data);
            this.router.navigate(['/']);
        },
        error => {
            console.log(error);
            error.status == 409 ? this.error409=true : this.router.navigate(['/error']);
})
 }


  onSubmit() {
    this.submitted = true;
	 const response = grecaptcha.getResponse();
         if (response.length === 0) {
            alert('Recaptcha not verified.');
            return;
        }
    this.save();
  }
  
validatePass(group: FormGroup){
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPass.value;
    
    return pass === confirmPass ? null : { mismatch: true }     
}

addScript() {
    let script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
}

}

