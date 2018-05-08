import { Component, OnInit } from '@angular/core';
import { IBook } from '../ibook';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DataService } from '../services/data.service';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { Router } from '@angular/router';
import { NewBookComponent } from '../new-book/new-book.component';


@Component({
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  pageTitle: string;
  public books: Array<IBook>;
  booksCount: number;
  showOperatingHours: boolean;
  openingTime: Date;
  closingTime: Date;

  constructor(
    private _snackBar: MatSnackBar,
    private _dataService: DataService,
    private _dialog: MatDialog, private _router: Router
  ) {
    this.openingTime = new Date();
    this.openingTime.setHours(10, 0);
    this.closingTime = new Date();
    this.closingTime.setHours(15, 0);
   }

  ngOnInit() {
    this.getBooks();
  }

  getBooks(): void {
    this._dataService.getBooks().subscribe(
        books => {
          this.books = books;
          this.booksCount = this.books.length;
        },
        error => this.updateMessage(<any>error, 'ERROR'));
  }

  addBook(): void {
    let config = {width: '650px', height: '650x', position: {top: '50px'}, disableClose: true};
    let dialogRef = this._dialog.open(NewBookComponent, config);
    dialogRef.afterClosed().subscribe(newBook => {
      if (newBook) {
        newBook.id = this.booksCount + 100;
        this._dataService.addBook(newBook)
            .subscribe(() => {},
                       () => {},
                       () => this.getBooks());
      }
    });
  }

  updateBook(book: IBook): void {
    this._dataService.updateBook(book)
        .subscribe(() =>{
          this._snackBar.open(`"${book.title}" has been updated!`, 'DISMISS', {
            duration: 3000
          });
        },
        error => this.updateMessage(<any>error, 'ERROR'));
  }

  deleteBook(book: IBook): void {
    this._dataService.deleteBook(book.id)
      .subscribe(() => {
        this.getBooks();
        this._snackBar.open(
          `"${book.title}" has been deleted!`,
          'DISMISS', {
          duration: 3000
        });
      },
      error => this.updateMessage(<any>error, 'ERROR'));
  }

  openDialog(bookId: number): void {
    let config = { width: '650px', height: '400x', position: { top: '50px' } };
    let dialogRef = this._dialog.open(BookDetailComponent, config);
    dialogRef.componentInstance.bookId = bookId;
    dialogRef.afterClosed().subscribe(res => {
        this.getBooks();
    });
  }

  openRoute(bookId: number): void {
    this._router.navigate(['/collection', bookId]);
  }

  updateMessage(message: string, type: string): void {
    if (message) {
        this._snackBar.open(`${type}: ${message}`, 'DISMISS', {
            duration: 3000
        });
    }
  }

  onRatingUpdate(book: IBook): void {
    this.updateBook(book);
    this.updateMessage(book.title, 'Rating has been updated');
  }

}
