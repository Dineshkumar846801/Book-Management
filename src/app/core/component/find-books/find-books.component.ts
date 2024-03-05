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
  }

  books: BookVM[] = [];
  book = Object.keys(this._book);

  private loadBook() {
    this.loadBookSubscription = this.bookService.fetch().subscribe({
      next: (_books) => {
        this.books = _books as BookVM[];
      },
    });
  }

  findBookHandler() {}

  filterClickHandler() {
    console.log(this.findBook);
  }

  ngOnDestroy(): void {
    this.loadBookSubscription?.unsubscribe();
  }
}
