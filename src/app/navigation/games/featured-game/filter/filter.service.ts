import {Injectable} from "@angular/core";


export interface Game {
  title: string,
  price: number,
  text: string,
  tag: string,
  id: number
}

@Injectable({
  providedIn: "root"
})
export class FilterService {
  games: Game[];
  filteredGames: Game[];

  constructor() {
    this.games = [
      {
        title: 'Doom Enternal',
        price: 200,
        text: 'Hell’s armies have invaded Earth. Become the Slayer in an epic single-player campaign to conquer demons ' +
          'across dimensions and stop the final destruction of humanity. The only thing they fear... is you.',
        tag: 'Indie',
        id: 1
      },
      {
        title: 'Doom Enternal',
        price: 150,
        text: 'Hell’s armies have invaded Earth. Become the Slayer in an epic single-player campaign to conquer demons ' +
          'across dimensions and stop the final destruction of humanity. The only thing they fear... is you.',
        tag: 'Action',
        id: 2
      },
      {
        title: 'Doom Enternal',
        price: 200,
        text: 'Hell’s armies have invaded Earth. Become the Slayer in an epic single-player campaign to conquer demons ' +
          'across dimensions and stop the final destruction of humanity. The only thing they fear... is you.',
        tag: 'Action',
        id: 3
      },
      {
        title: 'Doom Enternal',
        price: 250,
        text: 'Hell’s armies have invaded Earth. Become the Slayer in an epic single-player campaign to conquer demons ' +
          'across dimensions and stop the final destruction of humanity. The only thing they fear... is you.',
        tag: 'Indie',
        id: 4
      }, {
        title: 'Doom Enternal',
        price: 300,
        text: 'Hell’s armies have invaded Earth. Become the Slayer in an epic single-player campaign to conquer demons ' +
          'across dimensions and stop the final destruction of humanity. The only thing they fear... is you.',
        tag: 'Adventure',
        id: 5
      }, {
        title: 'Doom Enternal',
        price: 400,
        text: 'Hell’s armies have invaded Earth. Become the Slayer in an epic single-player campaign to conquer demons ' +
          'across dimensions and stop the final destruction of humanity. The only thing they fear... is you.',
        tag: 'Adventure',
        id: 6
      },
    ];
    this.filteredGames = this.games;
  }

  getFilter(tags: string[],price:number){
    this.filteredGames = this.games.filter((game) => {
      return tags.includes(game.tag) && game.price <= price;
    })
  }

  getFilterGames() {
    console.log(this.filteredGames);
    return this.filteredGames;
  }

  getAllGames(){
    return this.games;
  }
}
