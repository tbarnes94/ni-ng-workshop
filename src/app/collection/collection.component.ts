import { Component, OnInit } from '@angular/core';
import { IBook } from '../ibook';
import { MatSnackBar } from '@angular/material';
import { DataService } from '../services/data.service';

@Component({
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  pageTitle: string;
  books: Array<IBook>;
  showOperatingHours: boolean;
  openingTime: Date;
  closingTime: Date;

  constructor(
    private _snackBar: MatSnackBar,
    private _dataService: DataService,
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
        books => this.books = books,
        error => this.updateMessage(<any>error, 'ERROR'));
  }

  updateMessage(message: string, type: string): void {
    if (message) {
        this._snackBar.open(`${type}: ${message}`, 'DISMISS', {
            duration: 3000
        });
    }
  }

  onRatingUpdate(book: IBook): void {
    this.updateMessage(book.title, 'Rating has been updated');
  }

}
