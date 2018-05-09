import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IBook } from '../ibook';
import { DataService } from '../services/data.service';
import { MatSnackBar } from '@angular/material';

import * as fromRoot from '../rootReducer';
import * as BookDetailActions from './book-detail-actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit, OnDestroy {
  bookId: number;
  book: IBook;
  sub: Subscription;

  book$: Observable<IBook>;
  bookId$: Observable<number>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _dataService: DataService,
    private _snackBar: MatSnackBar,
    private store: Store<fromRoot.State>
  ) {
    this.book$ = store.select(fromRoot.selectBookDetailBook);
    this.book$.subscribe(book => this.book = book);
    this.bookId$ = store.select(fromRoot.selectBookDetailBookId);
  }

  ngOnInit() {
    if (!this.bookId) {
      this.sub = this._route.params.subscribe(
        params => {
          let id = +params['id'];
          this.getBook(id);
        });
      return;
    }
    this.getBook(this.bookId);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  getBook(id: number): void {
    this.store.dispatch(new BookDetailActions.GetBook(id));
    // this._dataService.getBook(id).subscribe(
    //   book => this.book = book,
    //   error => this.updateMessage(<any>error, 'Error'));
  }

  onRatingUpdate(book: IBook): void {
    this.updateBook(book);
  }

  updateMessage(message: string, type: string, actionText: string = 'DISMISS') {
    if (message) {
      this._snackBar.open(`${type}: ${message}`, actionText, {
        duration: 3000
      });
    }
  }

  previous(): void {
    this.store.dispatch(new BookDetailActions.GetPreviousId(this.book.id));
    // this._dataService.getPreviousBookId(this.book.id)
    //   .subscribe((bookId) => this._router.navigate(['/collection', bookId]));
  }

  next(): void {
    this.store.dispatch(new BookDetailActions.GetNextId(this.book.id));
    // this._dataService.getNextBookId(this.book.id)
    //   .subscribe((bookId) => this._router.navigate(['/collection', bookId]));
  } 

  return(): void {
    this._router.navigate(['/collection']);
  }

  updateBook(book: IBook): void {
    this.store.dispatch(new BookDetailActions.UpdateBook(book));
    // this._dataService.updateBook(book)
    //   .subscribe(
    //     books => {
    //       this._snackBar.open(`'${book.title}' has been updated!`, 'DISMISS', {
    //         duration: 3000
    //       });
    //     },
    //     error => this.updateMessage(<any>error, 'ERROR'));
  }
}
