import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../axios';
import { IUser } from '../interfaces/IUser';
import { RootState } from '../app/store';

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

// Async Thunk to create user
export const createUser = createAsyncThunk<IUser.User, IUser.CreateUser>(
  'users/createUser',
  async (values) => {
    const response = await axiosInstance.post('/users', values);
    if (response.status !== 201) {
      throw new Error('Failed to fetch users');
    }
    return response.data;
  },
);

export const updateUser = createAsyncThunk<
  IUser.User,
  IUser.CreateUser,
  { state: RootState }
>('users/updateUser', async (values, thunkAPI) => {
  const state = thunkAPI.getState();
  const response = await axiosInstance.put(
    `/users/${state.users.selectedUser?.id}`,
    values,
  );
  if (response.status !== 201) {
    throw new Error('Failed to fetch users');
  }
  return response.data;
});

export const toggleEdit = createAsyncThunk<IUser.User, IUser.User>(
  'users/toggleEdit',
  async (user) => {
    return user;
  },
);

export const toggleCreate = createAsyncThunk('users/toggleCreate', async () => {
  return true;
});

export const closeModal = createAsyncThunk('users/closeModal', async () => {
  return false;
});

export const deleteUser = createAsyncThunk<IUser.User, IUser.User>(
  'users/deleteUser',
  async (user) => {
    const response = await axiosInstance.delete(`/users/${user?.id}`);
    if (response.status !== 204) {
      throw new Error('Failed to fetch users');
    }
    fetchCollection();
    return user;
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
      .addCase(toggleCreate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        toggleCreate.fulfilled,
        (state, action: PayloadAction<boolean>) => {
          state.loading = false;
          state.selectedUser = null;
          state.openModal = action.payload;
        },
      );
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createUser.fulfilled,
        (state, action: PayloadAction<IUser.User>) => {
          state.loading = false;
          state.openModal = false;
        },
      )
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<IUser.User>) => {
          state.loading = false;
          state.openModal = false;
          state.selectedUser = null;
        },
      )
      .addCase(updateUser.rejected, (state, action) => {
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
      .addCase(closeModal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        closeModal.fulfilled,
        (state, action: PayloadAction<boolean>) => {
          state.loading = false;
          state.selectedUser = null;
          state.openModal = action.payload;
        },
      );
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteUser.fulfilled,
        (state, action: PayloadAction<IUser.User>) => {
          state.loading = false;
          const filtered: IUser.User[] =
            state.collection?.data?.filter(
              (iuser) => iuser.email !== action.payload.email,
            ) ?? [];
          state.users = filtered;
        },
      )
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default usersSlice.reducer;
