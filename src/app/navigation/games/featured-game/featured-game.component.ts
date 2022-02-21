import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FilterService} from "../../services/filter.service";
import {Game, GameService} from "../../services/game.service";
import {CookieService} from "../../services/cookie.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-featured-game',
  templateUrl: './featured-game.component.html',
  styleUrls: ['./featured-game.component.scss']
})

export class FeaturedGameComponent implements OnInit {

  games!: Game[];
  user_id = 0;


  constructor(private filterService: FilterService,
              private http: HttpClient,
              private cookieService: CookieService,
              private userService: UserService,
  ) {

  }

  Submit() {
    console.log('click');
    return this.http.post('https://testing-heroku-kekw.herokuapp.com/games', {
      title: 'Doom',
      price: 350,
      text: 'Hell’s armies have invaded Earth. Become the Slayer in an epic single-player campaign to conquer demons across dimensions and stop the final destruction of humanity. The only thing they fear... is you.',
      tag: 'Action',
      id: 1
    }).subscribe();
  }

  ngOnInit() {

  }

  addToLibrary(event: any) {
    this.user_id = JSON.parse(<string>this.cookieService.getCookie("user_info")).id;
    this.userService.getUser(this.user_id).subscribe((user) => {
      let idGame = event.target.id
      if (!user.favoriteGames?.includes(+idGame)) {
        let data = Object.assign(user, user.favoriteGames?.push(+idGame));
        this.userService.updateUser(this.user_id, data).subscribe(console.log);
      }
    });
    console.log('click ід:', this.user_id);
    console.log('event', event.target.id);
  }

  getGames() {
    return this.filterService.getFilterGames();
  }
}

