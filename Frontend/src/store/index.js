import { configureStore } from "@reduxjs/toolkit";
import { loadingBarReducer } from 'react-redux-loading'
import tweetSlice from "./tweet-slice";
import authSlice from "./auth-slice";
import userSlice from "./user-slice";
import notificationSlice from "./notification-slice";


const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    tweet: tweetSlice.reducer,
    user: userSlice.reducer,
    notification: notificationSlice.reducer,
    loadingBar: loadingBarReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})


export default store;