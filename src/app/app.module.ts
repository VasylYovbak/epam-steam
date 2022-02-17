import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FriendsComponent } from './navigation/friends/friends.component';
import { LibraryComponent } from './navigation/library/library.component';
import { GamesComponent } from './navigation/games/games.component';
import { LoginComponent } from './navigation/login/login.component';
import { ProfileComponent } from './navigation/profile/profile.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {LoginModule} from "./navigation/login/login.module";

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FriendsComponent,
    LibraryComponent,
    GamesComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
