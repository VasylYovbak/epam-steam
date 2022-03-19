import {Component, OnInit} from '@angular/core';
import { Game } from '../../services/game.service';
import {FilterService} from "../../services/filter.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchList!: Game[];
  search: string;

  constructor(private filterService: FilterService) {
    this.search = '';
  }

  ngOnInit(): void {

  }
  onSearch(search: string){
    this.filterService.onSearch(search)
  }


}
