import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS
} from "../constants/userConstant";

export const userReducer = (state = {user: "No user" }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };
        case LOGIN_SUCCESS:
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        
        default:
            return state;
    };
};