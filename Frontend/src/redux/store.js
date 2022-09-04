import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice';

export default configureStore({
  reducer: {
    authentication: authReducer,
  },
});
