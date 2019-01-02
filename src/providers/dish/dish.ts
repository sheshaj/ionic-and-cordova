import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs/Observable';
import { baseURL } from '../../shared/baseurl';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';


/*
  Generated class for the DishProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DishProvider {

  constructor(public http: HttpClient, private ProcessHttpmsgService: ProcessHttpmsgProvider) {
    console.log('Hello DishProvider Provider');
  }

  getDishes(): Observable<Dish[]> {
    return this.http.get(baseURL + 'dishes')
      .map(res => { return this.ProcessHttpmsgService.extractData(res) })
      .catch(error => { return this.ProcessHttpmsgService.handleError(error) });
  }

  getDish(id): Observable<Dish> {
    return this.http.get(baseURL + 'dishes/' + id)
      .map(res => { return this.ProcessHttpmsgService.extractData(res) })
      .catch(error => { return this.ProcessHttpmsgService.handleError(error) })
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get(baseURL + 'dishes?featured=true')
      .map(res => { return this.ProcessHttpmsgService.extractData(res)[0] })
      .catch(error => { return this.ProcessHttpmsgService.handleError(error) })
  }

}
