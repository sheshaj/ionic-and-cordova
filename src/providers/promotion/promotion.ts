import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Promotion } from '../../shared/promotion';
import { Observable } from 'rxjs/Observable';
import { baseURL } from '../../shared/baseurl';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
/*
  Generated class for the PromotionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PromotionProvider {

  constructor(public http: HttpClient, private ProcessHttpmsgService: ProcessHttpmsgProvider) {
    console.log('Hello PromotionProvider Provider');
  }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get(baseURL + 'promotions')
      .map(res => { return this.ProcessHttpmsgService.extractData(res) })
      .catch(error => { return this.ProcessHttpmsgService.handleError(error) });
  }

  getPromotion(id): Observable<Promotion> {
    return this.http.get(baseURL + 'promotions/' + id)
      .map(res => { return this.ProcessHttpmsgService.extractData(res) })
      .catch(error => { return this.ProcessHttpmsgService.handleError(error) })
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get(baseURL + 'promotions?featured=true')
      .map(res => { return this.ProcessHttpmsgService.extractData(res)[0] })
      .catch(error => { return this.ProcessHttpmsgService.handleError(error) })
  }


}
