import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription, find } from 'rxjs';
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

  //require for calculation
  private books: BookVM[] = [];
  filteredBooks: BookVM[] = [];

  bookKeys: string[] = [];

  booksKeysValues: Record<string, Set<any>> = {};
  private filterCriteria: Record<string, Set<any>> = {};
  bookKeyFilter: string[] = [];

  ngOnInit(): void {
    this.loadBook();

    Object.keys(this._book).forEach((book: any) => {
      if (
        book == 'author' ||
        book == 'language' ||
        book == 'price' ||
        book == 'pages'
      ) {
        this.bookKeys.push(book);
      }
    });
  }

  getBookValuesByKey = (key: string) => {
    return Array.from(this.booksKeysValues[key]);
  };

  // do groping ,group by key and his values
  //eg:. author:['Ram','Shyam', '...'], langulage:['C#', 'Javascript']
  private doGrouping(books: BookVM[]) {
    books.forEach((book: any) => {
      //based on key
      this.bookKeys.forEach((key) => {
        if (this.booksKeysValues[key]) {
          this.booksKeysValues[key].add(book[key]);
        } else {
          this.booksKeysValues[key] = this.getSetInitial(book[key]);
        }
      });
    });
  }

  private loadBook() {
    this.loadBookSubscription = this.bookService.fetch().subscribe({
      next: (_books) => {
        //raw objects
        this.books = _books;
        this.doGrouping(_books);
        this.doFilterByBookProperties(true);
      },
    });
  }

  doFilterByBookProperties(returnAllValue: boolean = false) {
    const matcher = (book: any) => {
      if (returnAllValue) return true;

      let result = false;
      const mainKeys = Object.keys(this.filterCriteria);
      for (let i = 0; i < mainKeys.length && !result; i++) {
        const key = mainKeys[i];
        const bookPropValueByKey = book[key];
        result = this.filterCriteria[key].has(bookPropValueByKey);
      }

      return result;
    };

    this.filteredBooks = this.books.filter((book) => matcher(book));
  }

  private getSetInitial = (value: string) => {
    var initial = new Set<string>();
    initial.add(value);
    return initial;
  };

  setCriteria(key: string, value: string, evt: any) {
    console.log('key', key);
    console.log('value', value);

    if (evt.currentTarget.checked) {
      if (this.filterCriteria[key]) this.filterCriteria[key].add(value);
      else this.filterCriteria[key] = this.getSetInitial(value);
    } else {
      this.filterCriteria[key].delete(value);
    }

    if (Object.keys(this.filterCriteria).length == 0) {
      this.doFilterByBookProperties(true);
    } else {
      this.doFilterByBookProperties();
    }
  }

  ngOnDestroy(): void {
    this.loadBookSubscription?.unsubscribe();
  }
}
