import { configureStore } from '@reduxjs/toolkit';
import {
  userRegister,
  userUpdate,
  userGet,
  userLogout,
  userLogin,
  isAuthCheckedSelector,
  userDataSelector,
  errorSelector,
  nameDataSelector,
  userReducer,
  TUserState,
  initialState
} from '../services/slices/userSlice';
import store from '../services/store';

const userData: TUserState = {
  isAuthChecked: false,
  user: {
    email: 'test@test.com',
    name: 'test'
  },
  error: undefined
};

const testStore = configureStore({
  reducer: {
    user: userReducer
  }
});

describe('userSlice', () => {
  it('should return initial state', () => {
    expect(testStore.getState().user).toEqual(initialState);
  });
});

describe('Тестирование selectors', () => {
  const state = testStore.getState();
  it('Тестирование isAuthCheckedSelector', () => {
    const isAuthChecked = isAuthCheckedSelector(state);
    expect(isAuthChecked).toEqual(false);
  });
  it('Тестирование userDataSelector', () => {
    const user = userDataSelector(state);
    expect(user).toBe(state.user.user);
  });
  it('Тестирование errorSelector', () => {
    const errorMessage = 'error';
    store.dispatch({
      type: userRegister.rejected.type,
      error: { massage: errorMessage }
    });
    const state = store.getState();
    const getError = errorSelector(state);
    expect(getError).toEqual(state.user.error);
  });
  it('Тестирование nameDataSelector', () => {
    store.dispatch({
      type: userGet.fulfilled.type,
      payload: { user: { name: 'test', email: userData.user.email } }
    });
    const state = store.getState();
    const name = nameDataSelector(state);
    expect(name).toBe(state.user.user.name);
  });
});

describe('extraReducers', () => {
  describe('Тестирование userRegister', () => {
    it('Тестирование pending', () => {
      store.dispatch({
        type: userRegister.pending.type
      });
      const state = store.getState();
      expect(state.user?.error).toBe(``);
    });
    it('Тестирование rejected', () => {
      store.dispatch({
        type: userRegister.rejected.type,
        error: { message: 'error' }
      });
      const state = store.getState();
      expect(state.user?.error).toBe('error');
    });
    it('Тестирование fulfilled', () => {
      store.dispatch({
        type: userRegister.fulfilled.type,
        payload: userData
      });
      const state = store.getState();
      expect(state.user.isAuthChecked).toBe(true);
      expect(state.user.user).toBe(userData.user);
      expect(state.user.error).toBe('');
    });
  });

  describe('Тестирование userUpdate', () => {
    it('Тестирование pending', () => {
      store.dispatch({
        type: userUpdate.pending.type
      });
      const state = store.getState();
      expect(state.user?.error).toBe(``);
    });
    it('Тестирование rejected', () => {
      store.dispatch({
        type: userUpdate.rejected.type,
        error: { message: 'error' }
      });
      const state = store.getState();
      expect(state.user?.error).toBe('error');
    });
    it('Тестирование fulfilled', () => {
      store.dispatch({
        type: userUpdate.fulfilled.type,
        payload: userData
      });
      const state = store.getState();
      expect(state.user.isAuthChecked).toBe(true);
      expect(state.user.user).toBe(userData.user);
      expect(state.user.error).toBe('');
    });
  });

  describe('Тестирование userLogin', () => {
    it('Тестирование pending', () => {
      store.dispatch({
        type: userLogin.pending.type
      });
      const state = store.getState();
      expect(state.user?.error).toBe(``);
      expect(state.user.isAuthChecked).toBe(false);
    });
    it('Тестирование rejected', () => {
      store.dispatch({
        type: userLogin.rejected.type,
        error: { message: 'error' }
      });
      const state = store.getState();
      expect(state.user?.error).toBe('error');
      expect(state.user.isAuthChecked).toBe(false);
    });
    it('Тестирование fulfilled', () => {
      store.dispatch({
        type: userLogin.fulfilled.type,
        payload: userData
      });
      const state = store.getState();
      expect(state.user.isAuthChecked).toBe(true);
      expect(state.user.user).toBe(userData);
      expect(state.user.error).toBe('');
    });
  });

  describe('Тестирование userLogout', () => {
    it('Тестирование fulfilled', () => {
      store.dispatch({
        type: userLogout.fulfilled.type
      });
      const state = store.getState();
      expect(state.user.isAuthChecked).toBe(false);
      expect(state.user.user).toEqual({ email: '', name: '' });
    });
  });

  describe('Тестирование userGet', () => {
    it('Тестирование fulfilled', () => {
      store.dispatch({
        type: userGet.fulfilled.type,
        payload: userData
      });
      const state = store.getState();
      expect(state.user.isAuthChecked).toBe(true);
      expect(state.user.user).toBe(userData.user);
      expect(state.user.error).toBe('');
    });
    it('Тестирование rejected', () => {
      store.dispatch({
        type: userGet.rejected.type,
        error: { message: 'error' }
      });
      const state = store.getState();
      expect(state.user.isAuthChecked).toBe(false);
      expect(state.user.error).toBe('error');
    });
  });
});
