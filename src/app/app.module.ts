import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './core/auth/login/login.component';
import { DashboardComponent } from './core/admin/dashboard/dashboard.component';
import { NavbarComponent } from './core/shared/component/navbar/navbar.component';
import { FooterComponent } from './core/shared/component/footer/footer.component';
import { AddBookComponent } from './core/component/add-book/add-book.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BookService } from './services/book.services';
import { BookListComponent } from './core/component/book-list/book-list.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'addbook', component: AddBookComponent },
  { path: 'booklist', component: BookListComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    FooterComponent,
    AddBookComponent,
    BookListComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,

    RouterModule.forRoot(routes),
  ],
  providers: [BookService],
  bootstrap: [AppComponent],
})
export class AppModule {}
