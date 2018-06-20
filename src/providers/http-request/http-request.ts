import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the HttpRequestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpRequestProvider {

  url:string='https://www.googleapis.com/books/v1/volumes?q=harry+potter&maxResults=20&startIndex'

  constructor(public http: HttpClient) {
    console.log('Hello HttpRequestProvider Provider');
  }

  getBooks(startIndex): Observable<any> {
    return this.http.get<any>(`${this.url}=${startIndex}`);
  }

}
