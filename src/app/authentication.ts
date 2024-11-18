import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../axios';
import { IAuth } from '../interfaces/IAuth';

const initialState: IAuth.AuthState = {
  error: false,
  loading: false,
};

export const signIn = createAsyncThunk<boolean, IAuth.Signin, any>(
  'auth/signIn',
  async (values, navigateDashboard) => {
    const response = await axiosInstance.post('/auth/login', values);
    if (response.status !== 201) {
      throw new Error('Failed to fetch users');
    }
    return true;
  },
);

export const validateError = createAsyncThunk<boolean>(
  'auth/validateError',
  async () => {
    return true;
  },
);

// Create the users slice
const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<boolean>) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      }),
      builder
        .addCase(validateError.pending, (state) => {
          state.loading = true;
          state.error = false;
        })
        .addCase(
          validateError.fulfilled,
          (state, action: PayloadAction<boolean>) => {
            state.loading = false;
            state.error = true;
          },
        )
        .addCase(validateError.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
        });
  },
});

export default auth.reducer;
