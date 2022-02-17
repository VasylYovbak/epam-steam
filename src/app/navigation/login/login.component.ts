import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User, UserService} from "../services/user.service";
import {CookieService} from "../services/cookie.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  singInForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(8)])
  })
  wrongLoginData = false;

  constructor(private userService: UserService, private cookieService: CookieService,private router:Router) {
  }

  ngOnInit(): void {
  }

  singIn() {
    this.userService.getUserByEmail(this.singInForm.value.email).subscribe((data) => {
      if (data.length) {
        if (data[0].password === this.singInForm.value.password) {
          this.cookieService.setCookie("user_info", JSON.stringify({id: data[0].id}), 60);
          this.router.navigate(['']);
        } else {
          this.wrongLoginData = true;
          this.singInForm.value.password = '';
          setTimeout(()=>{
            this.wrongLoginData = false;
          },5000)
        }
      } else {
        this.userService.addUser(this.singInForm.value).subscribe((user: User) => {
          this.cookieService.setCookie("user_info", JSON.stringify({id: user.id}), 60);
          this.router.navigate(['']);
        });
      }
    });

  }

}
