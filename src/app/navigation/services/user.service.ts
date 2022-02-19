import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User {
  id: number;
  email: string;
  password: string;
  username: string;
  age?: number;
  friends: Array<number>;
  favoriteGames: Array<number>;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  link = 'https://testing-heroku-kekw.herokuapp.com';
  constructor(private http: HttpClient) {}

  getUser(id: number) {
    return this.http.get<User>(this.link + `/user/${id}`);
  }
  getUserByEmail(email: string) {
    return this.http.get<User[]>(this.link + `/user?email=${email}`);
  }
  getUsers() {
    return this.http.get<User[]>(this.link + `/user`);
  }

  addUser(user: User) {
    user.username = user.email;
    user.friends = [];
    user.favoriteGames = [];
    return this.http.post<User>(this.link + '/user', user);
  }

  updateUser(id: number, data: User) {
    return this.http.put<User>(this.link + `/user/${id}`, data);
  }

  addFriend(id: number, friendId: number) {
    this.getUser(id).subscribe((user) => {
      if (user.friends?.indexOf(friendId) !== -1) {
        return;
      }
      user.friends?.push(friendId);
      this.updateUser(id, user).subscribe();
    });
  }

  deleteFriend(id: number, friendId: number) {
    this.getUser(id).subscribe((user) => {
      user.friends?.splice(user.friends?.indexOf(friendId), 1);
      this.updateUser(id, user).subscribe();
    });
  }
}
