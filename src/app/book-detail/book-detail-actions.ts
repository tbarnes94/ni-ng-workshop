import { Action } from '@ngrx/store';
import { IBook } from '../ibook';

export const GET_BOOK = '[Book Detail] Get Book';
export const GET_BOOK_SUCCESS = '[Book Detail] Get Book Success';

export const UPDATE_BOOK = '[Book Detail] Update Book';
export const UPDATE_BOOK_SUCCESS = '[Book Detail] Update Book Success';

export const GET_PREVIOUS_ID = '[Book Detail] Get Previous ID';
export const GET_PREVIOUS_ID_SUCCESS = '[Book Detail] Get Previous ID Success';

export const GET_NEXT_ID = '[Book Detail] Get Next ID';
export const GET_NEXT_ID_SUCCESS = '[Book Detail] Get Next ID Success';

export class GetBook implements Action {
    readonly type = GET_BOOK;

    constructor(public payload: number) { }
}

export class GetBookSuccess implements Action {
    readonly type = GET_BOOK_SUCCESS;

    constructor(public payload: IBook) { }
}

export class UpdateBook implements Action {
    readonly type = UPDATE_BOOK;

    constructor (public payload: IBook) { }
}

export class UpdateBookSuccess implements Action {
    readonly type = UPDATE_BOOK_SUCCESS;
}

export class GetPreviousId implements Action {
    readonly type = GET_PREVIOUS_ID;

    constructor (public payload: number) { }
}

export class GetPreviousIdSuccess implements Action {
    readonly type = GET_PREVIOUS_ID_SUCCESS;
}

export class GetNextId implements Action {
    readonly type = GET_NEXT_ID;

    constructor (public payload: number) { }
}

export class GetNextIdSuccess implements Action {
    readonly type = GET_NEXT_ID_SUCCESS;
}


export type All
    = GetBook
    | GetBookSuccess
    | UpdateBook
    | UpdateBookSuccess
    | GetNextId
    | GetNextIdSuccess
    | GetPreviousId
    | GetPreviousIdSuccess;