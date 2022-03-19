import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from "../services/user.service";
import {LoginComponent} from "./login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CookieService} from "../services/cookie.service";



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent
  ],
})
export class LoginModule { }
