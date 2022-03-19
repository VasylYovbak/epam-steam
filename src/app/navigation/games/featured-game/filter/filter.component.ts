import {Component, OnInit} from '@angular/core';
import {FilterService} from "../../../services/filter.service";
import {Game} from "../../../services/game.service";

export interface CheckBox {
  text: string,
  id: number
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  tagsArrForFilter: string[] = ["Indie", "Action", "Adventure"];
  checkBoxesArr: CheckBox[];
  games!: Game[];
  valuePrice: number = 1500;


  constructor(private filterService: FilterService) {
    this.checkBoxesArr = [{text: "Indie", id: 0}, {text: "Action", id: 1}, {text: "Adventure", id: 2}];
  }

  ngOnInit(): void {
    this.filterService.getAllGames();
  }

  getTagForFilter(event: any) {
    if (event.target.checked) {
      this.tagsArrForFilter.push(event.target.name);
    } else {
      this.tagsArrForFilter = this.tagsArrForFilter.filter((name) => name !== event.target.name);
    }
    this.filterService.getFilter(this.tagsArrForFilter, this.valuePrice);
  }

  getValuePrice() {
    this.filterService.getFilter(this.tagsArrForFilter, this.valuePrice);
  }

}
