import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
<<<<<<< HEAD

@NgModule({
  declarations: [
    AppComponent
=======
import {HttpClientModule} from "@angular/common/http";
import {NavigationModule} from "./navigation/navigation.module";

@NgModule({
  declarations: [
>>>>>>> 6543c2af430e0bc33da4cedcf35f757001d1680d
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NavigationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
