import { Component, OnInit } from '@angular/core';
import { User } from '../services/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

  isFriends(): boolean {
    return this.users[0].friends.length !== 0;
  }

  usersFriends(): string[] {
    return this.users[0].friends.map((user) => user);
  }

  onAddFriend(item: User) {
    this.userService.addToUserCollection(item);
  }

  onRemoveFriend(userName: User): void {
    console.log(userName)
    // this.userService.removeFromUserCollection(userName);
    // console.log(this.users[0].friends.filter((user) => user.indexOf(userName)));
  }
}
