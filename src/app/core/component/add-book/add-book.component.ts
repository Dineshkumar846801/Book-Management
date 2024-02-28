import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BookVM } from 'src/app/modules/bookVM';
import { BookService } from 'src/app/services/book.services';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit, OnDestroy {
  constructor(private bookService: BookService) {}

  loadBookSubscription: Subscription | null = null;
  createBookSubscription: Subscription | null = null;
  button = 'Submit';

  private get empty_book(): BookVM {
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

  books: BookVM[] = [];

  createBook = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    description: new FormControl(''),
    language: new FormControl(''),
    pages: new FormControl(),
    publish_date: new FormControl(),
    price: new FormControl(),
  });

  ngOnInit(): void {
    this.loadBookSubscription = this.bookService.fetch().subscribe({
      next: (_books) => {
        this.books = _books as BookVM[];
      },
    });

    if (this.bookService.book_edit) {
      this.button = 'Update';
      this.createBook.patchValue(this.bookService.book_edit);
    }
  }

  createBookHandler(): void {
    if (this.button == 'Submit') {
      this.createBookSubscription = this.bookService
        .create(this.createBook.value as BookVM)
        .subscribe({
          next: (_book) => {
            this.books.push(_book as BookVM);
          },
        });
    } else {
      this.bookService.update(this.bookService.book_edit as BookVM).subscribe({
        next: (_book) => {
          const item_index = this.books.findIndex(
            (item) => item.id === this.bookService.book_edit?.id
          );
          console.log(this.books[item_index], this.createBook.value.author);
          this.createBook.reset();
        },
      });
      console.log(this.books);
      this.button = 'Submit';
    }
    this.createBook.reset();
  }

  ngOnDestroy(): void {
    this.loadBookSubscription?.unsubscribe();
    this.createBookSubscription?.unsubscribe();
  }
}
