import { Action } from '@ngrx/store';
import { IBook } from '../ibook';

export const REQUEST_BOOKS = '[Collection] Request Books';
export const REQUEST_BOOKS_SUCCESS = '[Collection] Request Books Success';

export const UPDATE_BOOK = '[Collection] Update Book';
export const UPDATE_BOOK_SUCCESS = '[Collection] Update Book Success';

export const ADD_BOOK = '[Collection] Add Book';
export const ADD_BOOK_SUCCESS = '[Collection] Add Book Success';

export const DELETE_BOOK = '[Collection] Delete Book';
export const DELETE_BOOK_SUCCESS = '[Collection] Delete Book Success';

export class RequestBooks implements Action {
    readonly type = REQUEST_BOOKS;
}

export class RequestBooksSuccess implements Action {
    readonly type = REQUEST_BOOKS_SUCCESS;

    constructor(public payload: IBook[]) { }
}

export class UpdateBook implements Action {
    readonly type = UPDATE_BOOK;

    constructor(public payload: IBook) { }
}

export class UpdateBookSuccess implements Action {
    readonly type = UPDATE_BOOK_SUCCESS;
}

export class AddBook implements Action {
    readonly type = ADD_BOOK;

    constructor(public payload: IBook) { }
}

export class AddBookSuccess implements Action {
    readonly type = ADD_BOOK_SUCCESS;
}

export class DeleteBook implements Action {
    readonly type = DELETE_BOOK;

    constructor(public payload: number) { }
}

export class DeleteBookSuccess implements Action {
    readonly type = DELETE_BOOK_SUCCESS;
}

export type All
    = RequestBooks
    | RequestBooksSuccess
    | UpdateBook
    | UpdateBookSuccess
    | AddBook
    | AddBookSuccess
    | DeleteBook
    | DeleteBookSuccess;
