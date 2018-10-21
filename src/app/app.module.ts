import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ErrorComponent } from './layout/error/error.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { PanelComponent } from './patient/panel/panel.component';
import { VisitsComponent } from './patient/visits/visits.component';
import { ScheduleSearchFormComponent } from './schedule/schedule-search-form/schedule-search-form.component';
import { ScheduleComponent } from './schedule/schedule.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AccountService} from './services/account.service';
import * as $ from 'jquery';


@NgModule({
  declarations: [

    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ErrorComponent,
    LoginComponent,
    RegisterComponent,
    PanelComponent,
    VisitsComponent,
    ScheduleSearchFormComponent,
    ScheduleComponent
  
  ],
  imports: [
     BrowserModule,
     HttpModule,
     FormsModule,
     ReactiveFormsModule,
     HttpClientModule,
     AppRoutingModule,
     MDBBootstrapModule.forRoot(),
     TranslateModule.forRoot({
         loader: {
             provide: TranslateLoader,
             useFactory: HttpLoaderFactory,
             deps: [HttpClient]
         }
     }),
     NgbModule.forRoot()
     
  ],
  providers: [AccountService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
