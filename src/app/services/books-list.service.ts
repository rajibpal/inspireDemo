import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from '../models/books.model';

@Injectable({
  providedIn: 'root',
})
export class BooksListService {
  url = 'https://s3.amazonaws.com/api-fun/books.json';

  constructor(public http: HttpClient) {}
  /**
   * get the books details from backend
   * @returns an observable of Data type
   */
  getBookList(): Observable<Data> {
    return this.http.get<Data>(this.url);
  }
}
