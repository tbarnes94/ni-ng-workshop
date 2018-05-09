import { ActionReducerMap } from '@ngrx/store';
import { IBook } from './ibook';

import * as fromCollection from './collection/collection-reducer';
import * as fromBookDetail from './book-detail/book-detail-reducer';

export interface State {
    collection: fromCollection.State;
    bookDetail: fromBookDetail.State;
}

export const reducers: ActionReducerMap<State> = {
    collection: fromCollection.reducer,
    bookDetail: fromBookDetail.reducer,
};

export function selectCollectionBooks(state: State): IBook[] {
    return state.collection.books;
}

export function selectBookDetailBook(state: State): IBook {
    return state.bookDetail.book;
}

export function selectBookDetailBookId(state: State): number {
    return state.bookDetail.id;
}
