import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import {
    bookReducers,
    newBookReducer,
   // bookDetailsReducer,
} from "./reducers/bookReducers";
import {
    userReducer
} from "./reducers/useReducers";

const reducers = combineReducers({
    books: bookReducers,
    users: userReducer,
    newBook: newBookReducer,
   //bookDetails: bookDetailsReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;