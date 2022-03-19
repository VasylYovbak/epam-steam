import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {Observable, of} from "rxjs";
import {cookieServiceStub, routerStub, user, userServiceStub} from "../services/fakeTestingServices";
import {ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../services/user.service";
import {CookieService} from "../services/cookie.service";
import {Router} from "@angular/router";


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router : Router;
  let cookie : CookieService;
  let userService:UserService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        {provide: UserService, useValue: userServiceStub}, {
        provide: CookieService,
        useValue: cookieServiceStub
      }, {
        provide: Router,
        useValue: routerStub
      }]
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = fixture.debugElement.injector.get(Router);
    cookie = fixture.debugElement.injector.get(CookieService);
    userService = fixture.debugElement.injector.get(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should sing in with correct user info',()=>{
    let htmlDOM = fixture.debugElement.nativeElement;
    htmlDOM.querySelector('#email').value = 'vasa@top';
    htmlDOM.querySelector('#email').dispatchEvent(new Event('input'));
    htmlDOM.querySelector('#password').value = '12345678';
    htmlDOM.querySelector('#password').dispatchEvent(new Event('input'));
    fixture.autoDetectChanges();

    spyOn(router,'navigate').and.callThrough();

    spyOn(cookie , 'setCookie').and.callThrough();

    htmlDOM.querySelector('button').click();

    expect(router.navigate).toHaveBeenCalledWith(['']);
    expect(router.navigate).toHaveBeenCalledTimes(1);
    expect(cookie.setCookie).toHaveBeenCalledTimes(1);
  })
  it('should change wrongLoginData property to true, and after 5 second revert changes',(done)=>{
    component.singInForm.setValue( {
      email:"vasa@top",
      password:'123123123'
    })
    component.singIn();

    expect(component.wrongLoginData).toEqual(true);
    expect(component.singInForm.value.password).toEqual('');
    setTimeout(()=>{
      expect(component.wrongLoginData).toEqual(false);
      done();
    },6000)

  },7000)

  it('should create new user called function addUser',()=>{
    component.singInForm.setValue( {
      email:"vasa@top123",
      password:'123123123'
    })
    spyOn(router,'navigate').and.callThrough();

    spyOn(cookie , 'setCookie').and.callThrough();

    spyOn(userService,"addUser").and.callThrough().and.returnValue(of(user));

    component.singIn();

    expect(router.navigate).toHaveBeenCalledTimes(1);
    expect(cookie.setCookie).toHaveBeenCalledTimes(1);
    expect(userService.addUser).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['']);
  })

});


