import { Component, OnInit } from '@angular/core';
import {FilterService, Game} from "./filter/filter.service";


@Component({
  selector: 'app-featured-game',
  templateUrl: './featured-game.component.html',
  styleUrls: ['./featured-game.component.scss']
})

export class FeaturedGameComponent implements OnInit {

  games: Game[] | undefined;


  constructor(private filterService: FilterService) {

  }

  ngOnInit(): void {
    this.games = this.filterService.getAllGames();
  }

  getGames(){
    this.games = this.filterService.getFilterGames();
    return this.games;
  }
}
