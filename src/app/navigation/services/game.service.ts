import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";


export interface Game {
  name: string,
  price: number,
  description: string,
  tag: string,
  id: number
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  games!: Game[];

  link = 'https://testing-heroku-kekw.herokuapp.com';


  constructor(private http: HttpClient) {

  }

  getGamesFromDb(): Observable<Game[]> {
    return this.http.get(this.link + '/games')
      .pipe(map((response: { [key: string]: any }) => {
        return Object
          .keys(response)
          .map((key) => ({
            ...response[key]
          }))
      }))
  }
}
