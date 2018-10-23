import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { User } from '../../models/user';



@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

user:Observable<User>

  constructor(private accountService:AccountService) { }

  ngOnInit() {
	this.updateUserInfo();

  }

updateUserInfo(){
this.accountService.updateUserInfo()
.subscribe(data => {
   console.log(data);
   this.user = data;
});
}

}
