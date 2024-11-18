import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../axios';
import { IUser } from '../interfaces/IUser';

const initialState: IUser.UsersState = {
  collection: null,
  users: null,
  selectedUser: null,
  loading: false,
  openModal: false,
  error: null,
};

// Async Thunk to fetch users
export const fetchCollection = createAsyncThunk<IUser.Collection>(
  'users/fetchCollection',
  async () => {
    const response = await axiosInstance.get('/users');
    if (response.status !== 200) {
      throw new Error('Failed to fetch users');
    }
    return response.data;
  },
);

export const toggleEdit = createAsyncThunk<IUser.User, IUser.User>(
  'users/toggleEdit',
  async (user) => {
    return user;
  },
);

export const toggleEditOff = createAsyncThunk(
  'users/toggleEditOff',
  async (boolean) => {
    return false;
  },
);

// Create the users slice
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCollection.fulfilled,
        (state, action: PayloadAction<IUser.Collection>) => {
          state.loading = false;
          state.collection = action.payload;
          state.users = action.payload.data;
        },
      )
      .addCase(fetchCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
    builder
      .addCase(toggleEdit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        toggleEdit.fulfilled,
        (state, action: PayloadAction<IUser.User>) => {
          state.loading = false;
          state.selectedUser = action.payload;
          state.openModal = true;
        },
      );
    builder
      .addCase(toggleEditOff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        toggleEditOff.fulfilled,
        (state, action: PayloadAction<boolean>) => {
          state.loading = false;
          state.selectedUser = null;
          state.openModal = action.payload;
        },
      );
  },
});

export default usersSlice.reducer;
