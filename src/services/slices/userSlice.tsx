import {
  TRegisterData,
  loginUserApi,
  registerUserApi,
  updateUserApi,
  logoutApi,
  getUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const userRegister = createAsyncThunk('user/register', registerUserApi);

export const userUpdate = createAsyncThunk('user/update', updateUserApi);

export const userGet = createAsyncThunk('user/get', getUserApi);

export const userLogout = createAsyncThunk('user/logout', () => {
  logoutApi().then(() => {
    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
  });
});

export const userLogin = createAsyncThunk(
  'user/login',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const data = await loginUserApi({ email, password });

    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);
export interface TUserState {
  isAuthChecked: boolean;
  user: TUser;
  error: string | undefined;
}

export const initialState: TUserState = {
  isAuthChecked: false,
  user: {
    email: '',
    name: ''
  },
  error: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    userDataSelector: (state) => state.user,
    nameDataSelector: (state) => state.user.name,
    errorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.error = '';
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.error = '';
      })
      .addCase(userUpdate.pending, (state) => {
        state.error = '';
      })
      .addCase(userUpdate.rejected, (state, action) => {
        state.error = action.error.message;
        state.isAuthChecked = false;
      })
      .addCase(userUpdate.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.error = '';
      })
      .addCase(userGet.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.error = '';
      })
      .addCase(userGet.rejected, (state, action) => {
        state.error = action.error.message!;
        state.isAuthChecked = false;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.isAuthChecked = false;
        state.user = {
          email: '',
          name: ''
        };
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.error = '';
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.error = action.error.message;
        state.isAuthChecked = false;
      })
      .addCase(userLogin.pending, (state) => {
        state.isAuthChecked = false;
        state.error = '';
      });
  }
});

export const {
  isAuthCheckedSelector,
  userDataSelector,
  errorSelector,
  nameDataSelector
} = userSlice.selectors;

export const userReducer = userSlice.reducer;
