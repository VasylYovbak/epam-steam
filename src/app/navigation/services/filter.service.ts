import {Injectable} from "@angular/core";
import {Game, GameService} from "./game.service";


@Injectable({
  providedIn: "root"
})
export class FilterService {
  games!: Game[];
  filteredGames!: Game[];

  constructor(private gameService: GameService) {
    this.getAllGames();
  }

  getAllGames() {
    this.gameService.getGamesFromDb().subscribe((games) => {
      this.games = games;
      this.filteredGames = games;
    })
  }
  onSearch(search:string) {
    console.log('searchList',this.games);
    if (!search.trim()) {
      return this.filteredGames;
    }else {
      this.filteredGames = this.games.filter((game) => {
        console.log(game.title.includes(search));
        return game.title.includes(search);
      })
    }
    return this.filteredGames;
  }
  getFilter(tags: string[], price: number) {
    this.filteredGames = this.games;
    console.log('filteredGames', this.filteredGames);
    this.filteredGames = this.games.filter((game) => {
      return tags.includes(game.tag) && game.price <= price;
    })
  }

  getFilterGames() {
    return this.filteredGames;
  }
}
