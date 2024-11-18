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
  viewMode: 'table',
  triggerNotification: '',
};

// Async Thunk to fetch users
export const fetchCollection = createAsyncThunk<
  IUser.Collection,
  number | null,
  { state: RootState }
>('users/fetchCollection', async (page = null, thunkAPI) => {
  const state = thunkAPI.getState();
  const loadPage = page ? page : (state.users.collection?.page ?? 1);
  const response = await axiosInstance.get(`/users?page=${loadPage}`);
  if (response.status !== 200) {
    throw new Error('Failed to fetch users');
  }
  return response.data;
});

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
  if (response.status !== 200) {
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
    return user;
  },
);

export const filterUsers = createAsyncThunk<
  IUser.User[] | undefined | null,
  string,
  { state: RootState }
>('users/filterUsers', async (query, thunkAPI) => {
  const state = thunkAPI.getState();
  const data = state.users.users;
  if (!query || !data) {
    return data;
  } else {
    const filtered: IUser.User[] =
      data?.filter(
        (user) =>
          user.first_name.toLowerCase().includes(query.toLowerCase()) ||
          user.last_name.toLowerCase().includes(query.toLowerCase()),
      ) ?? [];
    return filtered;
  }
});

export const toggleViewMode = createAsyncThunk<string, string>(
  'users/toggleViewMode',
  async (mode) => {
    return mode;
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
          state.triggerNotification = 'User has been created';
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
          state.triggerNotification = 'User has been updated';
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
            state.users?.filter(
              (iuser) => iuser.email !== action.payload.email,
            ) ?? [];
          state.triggerNotification = 'User has been deleted';
          state.users = filtered;
        },
      )
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
    builder
      .addCase(filterUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        filterUsers.fulfilled,
        (state, action: PayloadAction<IUser.User[] | undefined | null>) => {
          state.loading = false;
          state.users = action.payload;
        },
      )
      .addCase(filterUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
    builder
      .addCase(toggleViewMode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        toggleViewMode.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.viewMode = action.payload;
        },
      );
  },
});

export default usersSlice.reducer;
