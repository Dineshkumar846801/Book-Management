import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindBooksComponent } from './find-books.component';

describe('FindBooksComponent', () => {
  let component: FindBooksComponent;
  let fixture: ComponentFixture<FindBooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FindBooksComponent]
    });
    fixture = TestBed.createComponent(FindBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
