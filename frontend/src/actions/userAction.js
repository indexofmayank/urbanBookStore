import axios from "axios";
import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS
} from "../constants/userConstant";

//For login action
export const login = (email, password) => async(dispatch) => {
    try{
        dispatch({type: LOGIN_REQUEST});
        
        const config = {header: {"Content-Type" : "application/json"}};
        let link = `http://localhost:8800/users/login`;
        const {data} = await axios.post(link, {email, password}, config);

        dispatch({type: LOGIN_SUCCESS, payload: data.user});

    }catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message,
        });
    }
};