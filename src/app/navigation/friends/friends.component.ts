import { Component, OnInit } from '@angular/core';
import { CookieService } from '../services/cookie.service';
import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  allUsers: User[] = [];
  friendsList: User[] = [];
  searchedUsersList: User[] = [];
  private currentUserId = this.cookieService.getUserCookie();

  constructor(
    private userService: UserService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.userService.getUser(this.currentUserId).subscribe((user) => {
      for (let friendId of user.friends) {
        this.userService.getUser(friendId).subscribe((friend) => {
          this.friendsList.push(friend);
        });
      }
      this.searchedUsersList = this.friendsList;
    });
    this.userService.getUsers().subscribe((users) => {
      this.allUsers = users;
    });
  }

  isSearchEmpty(inputValue: string) {
    return inputValue.length === 0;
  }

  isFriendsListEmpty() {
    return this.friendsList.length === 0;
  }

  isUserInFriendList(user: User) {
    return this.friendsList.map((friend) => friend.id).indexOf(user.id) !== -1;
  }

  isUser() {
    return this.searchedUsersList.length === 0;
  }

  onFriendSearch(searchedFriend: string) {
    if (searchedFriend === '') {
      this.searchedUsersList = this.friendsList;
    }else{
      this.searchedUsersList = this.allUsers.filter((user) => {
        return user.username.includes(searchedFriend);
      });
    }
  }

  onAddFriend(friend: User) {
    this.userService.addFriend(this.currentUserId, friend.id);
    this.friendsList.push(friend);
  }

  onRemoveFriend(friend: User) {
    this.userService.deleteFriend(this.currentUserId, friend.id);
    this.friendsList = this.friendsList.filter((user) => user.id !== friend.id);
  }
}
