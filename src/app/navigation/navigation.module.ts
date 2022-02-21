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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FeaturedGameComponent} from "./games/featured-game/featured-game.component";
import {SearchComponent} from "./games/search/search.component";
import {FilterComponent} from "./games/featured-game/filter/filter.component";
import {FilterService} from "./services/filter.service";
import {UserService} from "./services/user.service";
import {CookieService} from "./services/cookie.service";
import {AuthGuardService} from "./services/auth-guard.service";


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FriendsComponent,
    LibraryComponent,
    GamesComponent,
    ProfileComponent,
    FeaturedGameComponent,
    SearchComponent,
    FilterComponent],

  imports: [
    CommonModule,
    LoginModule,
    NavigationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [FilterService,UserService,CookieService,AuthGuardService]
})
export class NavigationModule { }
