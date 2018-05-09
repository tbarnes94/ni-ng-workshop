import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { IBook } from '../ibook';

import { DataService } from '../services/data.service';
import * as CollectionActions from './collection-actions';

@Injectable()
export class CollectionEffects {
    books$: Observable<IBook []>;

    constructor(
        private actions$: Actions,
        private _dataService: DataService,
    ) { }

    @Effect()
    public readonly request$: Observable<Action> = this.actions$.ofType(CollectionActions.REQUEST_BOOKS)
        .pipe(switchMap(() => this._dataService.getBooks()),
              map((results: IBook[]) => new CollectionActions.RequestBooksSuccess(results)));

    @Effect()
    public readonly update$: Observable<Action> = this.actions$.ofType(CollectionActions.UPDATE_BOOK)
        .pipe(map((action: CollectionActions.UpdateBook) => action.payload),
              switchMap((book: IBook) => this._dataService.updateBook(book)),
              map(() => new CollectionActions.UpdateBookSuccess()));
    
    @Effect()
    public readonly add$: Observable<Action> = this.actions$.ofType(CollectionActions.ADD_BOOK)
        .pipe(map((action: CollectionActions.AddBook) => action.payload),
              switchMap((book: IBook) => this._dataService.addBook(book)),
              map(() => new CollectionActions.AddBookSuccess()));

    @Effect()
    public readonly delete$: Observable<Action> = this.actions$.ofType(CollectionActions.DELETE_BOOK)
        .pipe(map((action: CollectionActions.DeleteBook) => action.payload),
              switchMap((id: number) => this._dataService.deleteBook(id)),
              map(() => new CollectionActions.DeleteBookSuccess()));

    @Effect()
    public readonly refresh$: Observable<Action> = this.actions$
        .ofType(
            CollectionActions.ADD_BOOK_SUCCESS,
            CollectionActions.DELETE_BOOK_SUCCESS,
        )
        .pipe(
            map(() => new CollectionActions.RequestBooks())
        );
}
