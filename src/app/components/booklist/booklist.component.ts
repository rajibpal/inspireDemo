import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksData } from 'src/app/models/books.model';
import { BooksListService } from '../../services/books-list.service';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.scss'],
})
export class BooklistComponent implements OnInit {
  booksList!: BooksData;
  sortToggle: boolean = false;
  newBookForm!: FormGroup;

  constructor(public booksService: BooksListService, public fb: FormBuilder) {}

  ngOnInit() {
    this.booksService.getBookList().subscribe((booksResp) => {
      this.booksList = booksResp.data;
      this.onToggleSort();
    });
  }

  /**
   * compare the input for sort
   * @param a
   * @param b
   * @param input
   * @returns
   */
  compareBy(a: any, b: any, input: string) {
    if (a[input] < b[input]) return -1;
    if (a[input] > b[input]) return 1;
    return 0;
  }

  /**
   * Sort the books details
   */

  onToggleSort() {
    if (this.sortToggle) {
      this.booksList.books.sort((x, y) => {
        return this.compareBy(x, y, 'PublishDate');
      });
    } else {
      this.booksList.books.sort((x, y) => {
        return this.compareBy(x, y, 'title');
      });
    }
  }

  /**
   * Add a new book.
   * Create new form. All fileds are required
   */
  addNewBook() {
    this.newBookForm = this.fb.group({
      title: ['', Validators.required],
      PublishDate: ['', Validators.required],
      imageUrl: ['', Validators.required],
      purchaseLink: ['', Validators.required],
    });
  }
  /**
   * Add the books details in the book list in UI
   * Sort the list
   * Close the model
   */
  submitBooksData() {
    if (this.newBookForm.valid) {
      this.booksList.books.push(this.newBookForm.value);
      this.onToggleSort();
      const myModal = document.getElementById('btnClose');
      myModal?.click();
    }
  }
}
