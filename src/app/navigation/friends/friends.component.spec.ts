import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { FriendsComponent } from './friends.component';
import {
  cookieServiceStub,
  userServiceStub,
} from '../services/fakeTestingServices';
import { User, UserService } from '../services/user.service';
import { CookieService } from '../services/cookie.service';

describe('FriendsComponent', () => {
  let component: FriendsComponent;
  let fixture: ComponentFixture<FriendsComponent>;
  let services: UserService;
  let cookie: CookieService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FriendsComponent],
      imports: [HttpClientModule],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: CookieService, useValue: cookieServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    services = TestBed.inject(UserService);
    cookie = TestBed.inject(CookieService);
    fixture = TestBed.createComponent(FriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Friends Component', () => {
    expect(component).toBeDefined();
  });

  it('sould search be empty', () => {
    expect(component.isSearchEmpty('test@test')).toBeFalse();
    expect(component.isSearchEmpty('')).toBeTrue();
  });

  it('sould friends list be empty', () => {
    expect(component.isFriendsListEmpty()).toBeFalse();
  });

  it('should user be in friends list', () => {
    let mockUser: User[] = [
      {
        id: 3,
        email: 'a@a',
        password: '12345678',
        username: 'a@a',
        friends: [],
        favoriteGames: [],
      },
    ];
    expect(component.isUserInFriendList(mockUser[0])).toBeFalsy();
  });

  it('should be user', () => {
    expect(component.isUser()).toBeFalse();
  });

  it('sould return friend list when input string is ""', () => {
    component.onFriendSearch('');
    expect(component.searchedUsersList).toEqual(component.friendsList);
  });

  it('sould return friend list when input string is "name of friend"', () => {
    component.onFriendSearch('tes@tes');
    expect(component.searchedUsersList).toEqual([
      {
        id: 2,
        email: 'tes@tes',
        password: '12345678',
        username: 'tes@tes',
        friends: [1, 2],
        favoriteGames: [],
      },
    ]);
  });

  it('should add friend to friend list', () => {
    let mockUser: User[] = [
      {
        id: 3,
        email: 'a@a',
        password: '12345678',
        username: 'a@a',
        friends: [],
        favoriteGames: [],
      },
    ];
    spyOn(services, 'addFriend').and.callThrough();
    component.onAddFriend(mockUser[0]);
    expect(services.addFriend).toHaveBeenCalled();
    expect(
      component.friendsList.filter((friend) => friend.id === mockUser[0].id)[0]
    ).toEqual(mockUser[0]);
  });

  it('should remove friend from friend list', () => {
    let mockUser: User[] = [
      {
        id: 2,
        email: 'tes@tes',
        password: '12345678',
        username: 'tes@tes',
        friends: [1, 2],
        favoriteGames: [],
      },
    ];
    spyOn(services, 'deleteFriend').and.callThrough();
    component.onRemoveFriend(mockUser[0]);
    expect(services.deleteFriend).toHaveBeenCalled();
    expect(
      component.friendsList.filter((friend) => friend.id !== mockUser[0].id)
    ).toEqual([]);
  });
});
