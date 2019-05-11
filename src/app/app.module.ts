import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { HelperService } from '../services/helper.service';

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
    MainHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule,
    DashboardModule,
  ],
  providers: [
    HelperService,
    DatePipe,
    {provide: LOCALE_ID, useValue: 'en'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
