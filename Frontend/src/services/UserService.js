import api from "../api/api"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";

export const register = async (credentials) => {
    try {
        const response = await api.User.register(credentials);
        if (response.isSuccess) {
            console.log("registration successful");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export async function login(credentials){
    try {
        const response = await api.User.login(credentials);
        if (response.isSuccess) {
            localStorage.setItem("token", response.token);
            return {
                result:response.result,
                token:response.token
            }
        } else {
            throw new Error(response.errorMessages);
        }
    } catch (error) {
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('token');  
}

export async function forgotPassword(body){
    try {
        const response = api.User.forgotPassword(body.id, body);
        return response;      
    } catch (error) {
        throw error;
    }
}