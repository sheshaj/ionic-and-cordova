import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs/Observable';
import { DishProvider } from '../dish/dish';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';


/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  favorites: Array<any>;

  constructor(public http: HttpClient, private dishservice: DishProvider,
    public storage: Storage, private localNotifications: LocalNotifications) {
    console.log('Hello FavoriteProvider Provider');
    this.storage.get('favourites').then(fav => {
      if (fav && fav.length > 0) {
        this.favorites = fav;
      } else {
        this.favorites = [];
      }
    });
  }

  getDataFromStorage() {
    this.storage.get('favourites').then(fav => {
      if (fav && fav.length > 0) {
        this.favorites = fav;
      }
    });
  }

  addFavorite(id: number): boolean {
    if (!this.isFavorite(id)) {
      this.favorites.push(id);
      this.storage.set('favourites', this.favorites);
      this.localNotifications.schedule({
        id: id,
        text: 'Dish ' + id + ' added as a favorite successfully'
      });
      return true;
    }
  }

  getFavorites(): Observable<Dish[]> {
    return this.dishservice.getDishes()
      .map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id)));

  }

  isFavorite(id: number): boolean {
    return this.favorites.some(el => el === id);
  }

  deleteFavorite(id: number): Observable<Dish[]> {

    let index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index, 1);
      this.storage.set('favourites', this.favorites);
      if (this.favorites.length === 0) {
        this.storage.remove('favourites');
      }
      return this.getFavorites();
    }
    else {
      console.log('Deleting non-existant favorite', id);
      return Observable.throw('Deleting non-existant favorite' + id);
    }

  }

}
