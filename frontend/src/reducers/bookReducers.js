import {
    ALL_BOOK_FAIL,
    ALL_BOOK_REQUEST,
    ALL_BOOK_SUCCESS,

    NEW_BOOK_FAIL,
    NEW_BOOK_REQUEST,
    NEW_BOOK_RESET,
    NEW_BOOK_SUCCESS,

    BOOK_DETAILS_FAIL,
    BOOK_DETAILS_SUCCESS,
    BOOK_DETAILS_REQUEST,

    CLEAR_ERRORS
} from "../constants/bookConstants";

export const bookReducers = (state = {books: []}, action) => {
    switch(action.type) {
        case ALL_BOOK_REQUEST:
            return {
                loading: true,
                books: [],
            };

        case ALL_BOOK_SUCCESS:
            return {
                loading: false,
                books: action.payload,
            };

        case ALL_BOOK_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const newBookReducer = (state = {book: {} }, action) => {
    switch (action.type) {
        case NEW_BOOK_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case NEW_BOOK_SUCCESS:
            return {
                loading: false,
                book: action.payload.book,
            };

        case NEW_BOOK_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case NEW_BOOK_RESET:
            return {
                ...state,
                loading: false,
            };
            
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default: 
            return state;
    }
};

// export const bookDetailsReducer = (state = {bookDetail: {} }, action) => {
//     switch(action.type) {
//         case BOOK_DETAILS_REQUEST:
//         return {
//             loading: true,
//             ...state,
//         };

//         case BOOK_DETAILS_SUCCESS:
//             return {
//                 loading: false,
//                 book: action.payload
//             };

//         case BOOK_DETAILS_FAIL:
//             return{
//                 loading: false,
//                 error: action.payload,
//             }
//         default:
//             return state;
//     }
// }