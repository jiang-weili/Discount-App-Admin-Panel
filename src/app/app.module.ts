import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AgmCoreModule } from '@agm/core';

import { CommonModule } from '@angular/common';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

import { DatePipe } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { ApiService } from './services/api.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LoginComponent } from './containers/login/login.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { DashboardModule } from './containers/dashboard/dashboard.module';
import { AddNewComponent } from './components/add-new/add-new.component';
import { MemberComponent } from './components/member/member.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    CarouselModule,
    BrowserAnimationsModule,
    DashboardModule,
    GooglePlaceModule,
    AgmCoreModule.forRoot({
        apiKey:'AIzaSyAUkBNadf_lQyCLnNbrgqB9PCLdFP-Agj8',
        libraries: ["places"]
    })
  ],
  providers: [
    DatePipe,
    {provide: LOCALE_ID, useValue: 'en'},
    AuthService, AuthGuard, ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
