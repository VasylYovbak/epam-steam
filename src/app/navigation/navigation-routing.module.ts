import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./profile/profile.component";
import {GamesComponent} from "./games/games.component";
import {FriendsComponent} from "./friends/friends.component";
import {LibraryComponent} from "./library/library.component";

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path:'profile',component:ProfileComponent},
  {path:'',component:GamesComponent},
  {path:'friends',component:FriendsComponent},
  {path:'library',component:LibraryComponent},
  {path:'**',component:GamesComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule {

}
