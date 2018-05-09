import { IBook } from '../ibook';
import * as BookDetailActions from './book-detail-actions';

export interface State {
    book?: IBook;
    id?: number;
}

const initialState = {
    book: undefined,
    id: undefined,
};

export function reducer(state = initialState, action: BookDetailActions.All): State {
    switch (action.type) {
        case BookDetailActions.GET_BOOK: {
            return {
                ...state,
                id: action.payload
            };
        }
        case BookDetailActions.GET_BOOK_SUCCESS: {
            return {
                ...state,
                book: action.payload,
                id: undefined,
            };
        }
        case BookDetailActions.UPDATE_BOOK: {
            return {
                ...state,
                book: action.payload
            }
        }
        case BookDetailActions.UPDATE_BOOK_SUCCESS: {
            return {
                ...state,
            }
        }
        case BookDetailActions.GET_PREVIOUS_ID: {
            return {
                ...state,
                id: action.payload
            };
        }
        case BookDetailActions.GET_PREVIOUS_ID_SUCCESS: {
            return {
                ...state,
            };
        }
        case BookDetailActions.GET_PREVIOUS_ID: {
            return {
                ...state,
                id: action.payload
            };
        }
        case BookDetailActions.GET_PREVIOUS_ID_SUCCESS: {
            return {
                ...state,
            };
        }
        default: {
            return state;
        }
    }
}
