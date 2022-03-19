import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavigationComponent} from './navigation.component';

import {cookieServiceStub, routerStub} from "./services/fakeTestingServices";
import {CookieService} from "./services/cookie.service";
import {Router} from "@angular/router";

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let router: Router;
  let cookieService: CookieService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      providers: [{
        provide: CookieService,
        useValue: cookieServiceStub
      }, {
        provide: Router,
        useValue: routerStub
      }]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = fixture.debugElement.injector.get(Router);
    cookieService = fixture.debugElement.injector.get(CookieService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should isLoggedIn be true', () => {
    component.ngDoCheck();
    expect(component.loggedIn).toBeFalse();
  });
  it('should logOut after press on button logOut', () => {

    spyOn(cookieService, "clearCookie").and.callThrough();
    spyOn(router, "navigate").and.callThrough();

    fixture.debugElement.nativeElement.querySelector('#logOut').click();

    expect(cookieService.clearCookie).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
  });

});
