import { IBook } from '../ibook';
import * as CollectionActions from './collection-actions';

export interface State {
    books: IBook[];
    book?: IBook;
    id?: number;
}

const initialState = {
    books: [],
};

export function reducer(state = initialState, action: CollectionActions.All): State {
    switch (action.type) {
        case CollectionActions.ADD_BOOK: {
            return {
                ...state,
                book: action.payload,
            }
        }
        case CollectionActions.ADD_BOOK_SUCCESS: {
            return {
                ...state,
            }
        }
        case CollectionActions.REQUEST_BOOKS: {
            return {
                ...state,
            };
        }
        case CollectionActions.REQUEST_BOOKS_SUCCESS: {
            return {
                ...state,
                books: action.payload,
                book: undefined,
                id: undefined,
            }
        }
        case CollectionActions.UPDATE_BOOK: {
            return {
                ...state,
                book: action.payload,
            }
        }
        case CollectionActions.UPDATE_BOOK_SUCCESS: {
            return {
                ...state,
            }
        }
        default: {
            return state;
        }
    }
}
