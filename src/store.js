import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authReducer from './features/auth/authSlice';
import usersReducer from './features/users/usersSlice';
import questionsReducer from './features/questions/questionsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    questions: questionsReducer,
    loadingBar: loadingBarReducer,
  },
});