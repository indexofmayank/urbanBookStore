import axios from "axios";

import {
    ALL_BOOK_FAIL,
    ALL_BOOK_REQUEST,
    ALL_BOOK_SUCCESS,

    NEW_BOOK_FAIL,
    NEW_BOOK_REQUEST,
    NEW_BOOK_RESET,
    NEW_BOOK_SUCCESS,

    BOOK_DETAILS_REQUEST,
    BOOK_DETAILS_SUCCESS,
    BOOK_DETAILS_FAIL,

} from "../constants/bookConstants";

//Get all book
export const getBooks = () => async (dispatch) => {
    try {
        dispatch({type: ALL_BOOK_REQUEST});

        let link = `http://localhost:8800/books/`;

        const {data} = await axios.get(link);

        dispatch({
            type: ALL_BOOK_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_BOOK_FAIL,
            payload: error.response.data.message,
        });
    }
};

//Create book
export const creatBook = (bookData) => async(dispatch) => {
    try {
        dispatch({type: NEW_BOOK_REQUEST});

        const config = {
            headers: {"Content-Type" : "application/json"},
        };

        let link = `http://localhost:8800/books/`;

        const {data} = await axios.post(
            link,
            bookData,
            config
        );

        dispatch({
            type: NEW_BOOK_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: NEW_BOOK_FAIL,
            payload: error.response.data.message,
        });
    }
};

//Get book detail
// export const getBookDetails = (id) => async(dispatch) => {
//     try {
//         dispatch({type: BOOK_DETAILS_REQUEST});

//         const config = {
//             headers: {"Content-Type" : "application/json"},
//         };

//         let link = `http://localhost:8800/books/${id}`;

//         const {data} = await axios.get(link, config);

//         dispatch({
//             type: BOOK_DETAILS_SUCCESS,
//             payload: data
//         });

//     } catch (error) {
//         dispatch({
//             type: BOOK_DETAILS_FAIL,
//             payload: error.response.data.message,
//         });
//     } 
// };