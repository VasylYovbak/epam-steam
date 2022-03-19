import { Observable, of } from 'rxjs';
import { User, UserService } from './user.service';
import { CookieService } from './cookie.service';
import { Router } from '@angular/router';

export let userServiceStub: Partial<UserService>;
export let cookieServiceStub: Partial<CookieService>;
export let routerStub: Partial<Router>;

export let user = {
  id: 1,
  email: 'vasa@top',
  password: '12345678',
  username: 'vasa',
  age: 18,
  friends: [1, 2],
  favoriteGames: [],
};
let users = [
  user,
  {
    id: 2,
    email: 'tes@tes',
    password: '12345678',
    username: 'tes@tes',
    friends: [1],
    favoriteGames: [],
  },
  {
    id: 3,
    email: 'a@a',
    password: '12345678',
    username: 'a@a',
    friends: [],
    favoriteGames: [],
  },
];
userServiceStub = {
  getUser: (id) => {
    return of<User>(users.filter((user) => user.id === id)[0]);
  },
  getUsers(): Observable<User[]> {
    return of<User[]>(users);
  },
  updateUser(id: number, data: User): Observable<User> {
    const newData = Object.assign(user, data);
    return of<User>(newData);
  },
  getUserByEmail(email: string): Observable<User[]> {
    if (email === user.email) {
      return of([user]);
    } else {
      return of([]);
    }
  },
  addUser(user: User): Observable<User> {
    return of(user);
  },
  addFriend(id: number, friendId: number) {
  },
  deleteFriend(id: number, friendId: number) {
  }
};
cookieServiceStub = {
  getCookie(name: string): string | null {
    return name === "user_info" ? '{"id":1}' : null;
  },
  setCookie(name: string, value: string, minutes: number) {
  },
  getUserCookie(): number {
    return 1;
  },
  clearCookie(name: string) {
  },
};

routerStub = {
  navigate: function () {
    return new Promise<boolean>((resolve, reject) => resolve(true));
  },
};
