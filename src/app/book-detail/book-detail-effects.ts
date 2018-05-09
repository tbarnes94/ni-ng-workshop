import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { IBook } from '../ibook';

import { DataService } from '../services/data.service';
import * as BookDetailActions from './book-detail-actions';
import { Router } from '@angular/router';

@Injectable()
export class BookDetailEffects {

    constructor(
        private actions$: Actions,
        private _dataService: DataService,
        private router: Router,
    ) { }

    @Effect()
    public readonly get$: Observable<Action> = this.actions$.ofType(BookDetailActions.GET_BOOK)
        .pipe(
            map((action: BookDetailActions.GetBook) => action.payload),
            switchMap((id: number) => this._dataService.getBook(id)),
            map((book: IBook) => new BookDetailActions.GetBookSuccess(book))
        );
    
    @Effect()
    public readonly update$: Observable<Action> = this.actions$.ofType(BookDetailActions.UPDATE_BOOK)
        .pipe(
            map((action: BookDetailActions.UpdateBook) => action.payload),
            switchMap((book: IBook) => this._dataService.updateBook(book)),
            map(() => new BookDetailActions.UpdateBookSuccess())
        );
    
    @Effect()
    public readonly getPreviousId$: Observable<Action> = this.actions$.ofType(BookDetailActions.GET_PREVIOUS_ID)
        .pipe(
            map((action: BookDetailActions.GetPreviousId) => action.payload),
            switchMap((id: number) => this._dataService.getPreviousBookId(id)),
            map((id: number) => this.router.navigate(['/collection', id])),
            map(() => new BookDetailActions.GetPreviousIdSuccess())
        );
    
    @Effect()
    public readonly getNextId$: Observable<Action> = this.actions$.ofType(BookDetailActions.GET_NEXT_ID)
        .pipe(
            map((action: BookDetailActions.GetNextId) => action.payload),
            switchMap((id: number) => this._dataService.getNextBookId(id)),
            map((id: number) => this.router.navigate(['/collection', id])),
            map(() => new BookDetailActions.GetNextIdSuccess())
        );
}
