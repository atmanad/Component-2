import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../slice";

const store = configureStore({
    reducer:{
        auth:authSlice.reducer
    }
})


export default store;

// import { combineReducers } from 'redux'
// import auth from './auth-slice';
// // import users from './users';
// import tweet from './tweet';
// import { loadingBarReducer } from 'react-redux-loading'

// const rootReducers = combineReducers({
//     auth,
//     tweet,
//     loadingBar: loadingBarReducer
// })

// export default rootReducers