import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../app/usersSlice';
import authReducer from '../app/authentication';
export const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
  },
});
// Infer RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
