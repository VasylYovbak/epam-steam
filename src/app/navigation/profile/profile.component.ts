import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {CookieService} from "../services/cookie.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    email: new FormControl(''),
    age: new FormControl('',[Validators.min(10)])
  });
  user_id = 0;

  constructor(private userService: UserService, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    if (this.cookieService.getCookie("user_info") !== null) {
      this.user_id = JSON.parse(<string>this.cookieService.getCookie("user_info")).id;
      this.userService.getUser(this.user_id).subscribe((user) => {
        this.profileForm.controls['email'].setValue(user.email);
        this.profileForm.controls['age'].setValue(user.age || '');
        this.profileForm.controls['username'].setValue(user.username || '');
      })
    }
  }

  updateProfile() {
    this.userService.getUser(this.user_id).subscribe((user) => {
      let data = Object.assign(user,this.profileForm.value);
      this.userService.updateUser(this.user_id, data).subscribe(console.log);
    })
  }
}
