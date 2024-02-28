import { BookVM } from '../modules/bookVM';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BookService {
  http_url = `http://localhost:3000/books`;
  book_edit: BookVM | null = null;
  constructor(private http: HttpClient) {}

  create(book: BookVM) {
    return this.http.post(`${this.http_url}`, book);
  }

  update(book: BookVM) {
    return this.http.put(`${this.http_url}/${book.id}`, book);
  }

  fetch() {
    return this.http.get(`${this.http_url}`);
  }

  delete(book: BookVM) {
    return this.http.delete(`${this.http_url}/${book.id}`);
  }

  editBook(book: BookVM) {
    this.book_edit = book;
  }
}