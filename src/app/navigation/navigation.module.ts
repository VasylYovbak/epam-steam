import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppComponent} from "../app.component";
import {NavigationComponent} from "./navigation.component";
import {FriendsComponent} from "./friends/friends.component";
import {LibraryComponent} from "./library/library.component";
import {GamesComponent} from "./games/games.component";
import {ProfileComponent} from "./profile/profile.component";
import {LoginModule} from "./login/login.module";
import {NavigationRoutingModule} from "./navigation-routing.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FriendsComponent,
    LibraryComponent,
    GamesComponent,
    ProfileComponent],
  imports: [
    CommonModule,
    LoginModule,
    NavigationRoutingModule,
    ReactiveFormsModule,
  ]
})
export class NavigationModule { }
