import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name:'notification',
    initialState:{notification:{
        message:"",
        type:"",
        open:false
    }},
    reducers:{
        showNotification(state,action){
            state.notification = {
                message:action.payload.message,
                type:action.payload.type,
                open:action.payload.open
            }
        }
    }
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice;