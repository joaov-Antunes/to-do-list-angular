import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ChartModule } from 'angular-highcharts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CKEditorModule } from 'ckeditor4-angular';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CardComponent } from './components/card/card.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { RegisterComponent } from './components/register/register.component';
import { ChartsComponent } from './components/charts/charts.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardComponent,
    CreateComponent,
    EditComponent,
    RegisterComponent,
    ChartsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ChartModule,
    CommonModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CKEditorModule
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
