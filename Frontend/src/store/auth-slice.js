import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:{isLoggedIn:false, token:null},
    reducers:{
        login(state){
            state.isLoggedIn = true;
        },
        logout(state){
            state.isLoggedIn = false; 
        },
        addToken(state,action){
            state.token = action.payload;
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice;