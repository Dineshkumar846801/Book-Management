import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { BookService } from 'src/app/services/book.services';
import { BookVM } from 'src/app/modules/bookVM';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit, OnDestroy {
  constructor(private bookService: BookService, private router: Router) {}

  books: BookVM[] = [];

  loadBookSubscription: Subscription | null = null;
  deleteBookSubscription: Subscription | null = null;

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

  private loadBook() {
    this.loadBookSubscription = this.bookService.fetch().subscribe({
      next: (_books) => {
        this.books = _books as BookVM[];
      },
    });
  }

  deleteClickHandler(book: BookVM) {
    if (confirm('Are you sure want to delete?')) {
      this.deleteBookSubscription = this.bookService.delete(book).subscribe({
        next: (_book) => {
          const item_index = this.books.findIndex((b) => b.id == book.id);
          this.books.splice(item_index, 1);
          this.loadBook();
        },
      });
    }
  }

  editClickHandler(book: BookVM) {
    if(confirm('Are you sure want to edit')){
      this.router.navigateByUrl('addbook');
      this.bookService.editBook(book);

    }
  }

  ngOnDestroy(): void {
    this.loadBookSubscription?.unsubscribe();
    this.deleteBookSubscription?.unsubscribe();
  }
}
