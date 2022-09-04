import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'authentication',
    initialState: {
        auth: false,
        token:""
    },
    reducers: {
        rLogin: (state) => {
            state.auth = true;
        },
        rLogout: (state) => {
            state.value = false;
        }
    },
})

export const { rLogin, rLogout } = authSlice.actions

export const authState = (state) => state.authentication.auth;

export default authSlice.reducer
