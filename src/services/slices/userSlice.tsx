import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export interface TUserState {
  isAuthChecked: boolean;
  user: TUser;
  error: string | undefined;
}

const initialState: TUserState = {
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
    errorSelector: (state) => state.error
  }
});

export const { isAuthCheckedSelector, userDataSelector, errorSelector } =
  userSlice.selectors;

export const userReducer = userSlice.reducer;
