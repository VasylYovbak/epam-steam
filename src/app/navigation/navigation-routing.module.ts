import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./profile/profile.component";
import {GamesComponent} from "./games/games.component";
import {FriendsComponent} from "./friends/friends.component";
import {LibraryComponent} from "./library/library.component";
import {AuthGuardService} from "./services/auth-guard.service";

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path:'profile',component:ProfileComponent ,canActivate:[AuthGuardService]},
  {path:'',component:GamesComponent},
  {path:'friends',component:FriendsComponent ,canActivate:[AuthGuardService]},
  {path:'library',component:LibraryComponent ,canActivate:[AuthGuardService]},
  {path:'**',component:GamesComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule {

}
