import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileComponent} from './profile.component';
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {UserService, User} from "../services/user.service";
import {CookieService} from "../services/cookie.service";
import {Type} from "@angular/core";
import {Observable, of} from 'rxjs';
import {ReactiveFormsModule} from "@angular/forms";
import {cookieServiceStub, user, userServiceStub} from "../services/fakeTestingServices";


describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let userService :UserService;
  let cookieService:CookieService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [ProfileComponent],
      providers: [{provide: UserService, useValue: userServiceStub}, {
        provide: CookieService,
        useValue: cookieServiceStub
      }]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    cookieService = TestBed.inject(CookieService);
    userService = TestBed.inject(UserService);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render form with h2 tag Profile', () => {
    const htmlDOM = fixture.nativeElement;
    const text = htmlDOM.querySelector('h2').textContent;
    expect(text).toEqual('Profile');
  })
  it('should render page with empty age property', () => {
    let newUser = Object.create(user);
    newUser.age=0;
    let spy = spyOn(userService, "getUser").and.returnValue(of(newUser));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector("#age").value).toEqual('');
    spy.and.returnValue(of(user));
    component.ngOnInit()
  })
  it('should take correct user id from cookie', () => {
    const user_id = JSON.parse(<string>cookieService.getCookie("user_info")).id;
    expect(component.user_id).toEqual(user_id);
  })
  it('should render form with data from formProfile element', () => {
    const form = fixture.nativeElement.querySelector("form");
    const formData = {
      username: form.querySelector('#username').value,
      age: form.querySelector('#age').value === '' ? 0 : +form.querySelector('#age').value,
      email: form.querySelector('#email').value
    };
    expect(formData).toEqual(component.profileForm.value);
  })
  it('should render form with data about user with id 1', () => {
    const form = fixture.nativeElement.querySelector("form");
    const formData = {
      username: form.querySelector('#username').value,
      age: +form.querySelector('#age').value,
      email: form.querySelector('#email').value
    };
    userService.getUser(1).subscribe((data) => {
      console.log(data,formData);
      expect(data.username).toEqual(formData.username);
      expect(data.email).toEqual(formData.email);
      expect(data.age).toEqual(formData.age);
    });
  })
  it('should correct call updateProfile after click on saveButton', () => {
    const saveButton = fixture.nativeElement.querySelector('button');
    spyOn(component, 'updateProfile').and.callThrough();
    saveButton.click();
    expect(component.updateProfile).toHaveBeenCalled();

  })

  it('should correct update user after click on saveButton', () => {
    const saveButton = fixture.nativeElement.querySelector('button');
    component.profileForm.value.username = "DarkStyle";
    let myUser = Object.assign(user, {username: "DarkStyle"})
    spyOn(userService, 'updateUser').and.callThrough();
    saveButton.click();
    expect(userService.updateUser).toHaveBeenCalledWith(1, myUser);
  })


});
