import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';

import {HttpClientModule} from "@angular/common/http";
import {NavigationModule} from "./navigation/navigation.module";

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    NavigationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
