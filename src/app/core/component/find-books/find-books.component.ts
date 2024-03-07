import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BookVM } from 'src/app/modules/bookVM';
import { BookService } from 'src/app/services/book.services';

@Component({
  selector: 'app-find-books',
  templateUrl: './find-books.component.html',
  styleUrls: ['./find-books.component.css'],
})
export class FindBooksComponent implements OnInit, OnDestroy {
  loadBookSubscription: Subscription | null = null;
  constructor(private bookService: BookService) {}

  findBook = new FormGroup({
    find_item: new FormControl(''),
    filtered: new FormControl(''),
  });

  private get _book(): BookVM {
    return {
      id: '',
      title: '',
      image: '',
      author: '',
      description: '',
      language: '',
      pages: 0,
      price: 0,
      publish_date: new Date(),
    };
  }

  ngOnInit(): void {
    this.loadBook();
    let _bookkeys: string[] = [];
    this.bookKeys.forEach((book: any) => {
      if ( book == 'author' || book == 'language' || book == 'price' || book == 'pages' ) {
        _bookkeys.push(book);
      }
    });
    this.bookKeys = _bookkeys;
  }

  books: BookVM[] = [];
  bookKeys = Object.keys(this._book);
  // bookKeys = ['title']

  getBookValuesByKey = (key: string) => {
    if (this.books.length) {
      //getting values based on particular key
      return this.books.map((book: any) => book[key]);
    }
    return [];
  };

  private loadBook() {
    this.loadBookSubscription = this.bookService.fetch().subscribe({
      next: (_books) => {
        this.books = _books;
      },
    });
  }

  findBookHandler() {}

  filterClickHandler() {}

  ngOnDestroy(): void {
    this.loadBookSubscription?.unsubscribe();
  }
}
