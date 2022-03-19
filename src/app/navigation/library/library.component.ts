import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Game, GameService} from '../services/game.service';
import {UserService} from '../services/user.service';
import {CookieService} from "../services/cookie.service";

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  link = 'https://testing-heroku-kekw.herokuapp.com';
  libraryArr!: number[] | undefined;
  games!: Game[];
  arr!: Game[];
  user_id = 0;

  constructor(private http: HttpClient,
              private userService: UserService,
              private cookieService: CookieService,
              private gameService: GameService) {

  }

  ngOnInit(): void {
    this.getAllGames();
    this.getFavouriteGames();
  }

  getAllGames() {
    this.gameService.getGamesFromDb().subscribe((games) => {
      this.games = games;
    })
  }

  getFavouriteGames() {
    this.user_id = JSON.parse(<string>this.cookieService.getCookie("user_info")).id;
    this.userService.getUser(this.user_id).subscribe((user) => {
      this.libraryArr = user.favoriteGames;
    });
  }

  getGames() {
    if(this.games){
      this.arr = this.games.filter((game) => this.libraryArr?.includes(game.id))
      return this.arr;
    } else {
      return
    }
  }
}
