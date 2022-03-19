import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable, of} from "rxjs";
import {CookieService} from "./cookie.service";

@Injectable({
  providedIn:"root"
})
export class AuthGuardService implements CanActivate{
  constructor(private cookie:CookieService) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.cookie.getCookie("user_info")!==null){
      return of(true);
    }else{
      return of(false);
    }
  }

}
