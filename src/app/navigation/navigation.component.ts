import {Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {CookieService} from "./services/cookie.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit,DoCheck {

  loggedIn:boolean =true ;
  constructor(private cookie:CookieService,private router:Router) { }


  ngOnInit(): void {

  }
  ngDoCheck() {
    this.loggedIn = this.cookie.getCookie("user_info") === null;
  }

  logOut() {
      this.cookie.clearCookie("user_info");
      this.router.navigate(['/login']);
  }
}
