import { configureStore } from '@reduxjs/toolkit';
import {
  getFeedsList,
  TFeedsState,
  initialState,
  ordersSelector,
  totalSelector,
  totalTodaySelector,
  isLoadingSelector,
  errorSelector,
  feedsReducer
} from '../services/slices/feedsSlice';
import store from '../services/store';

const testStore = configureStore({
  reducer: {
    feeds: feedsReducer
  }
});

const feedsData: TFeedsState = {
  orders: [
    {
      _id: '1',
      ingredients: ['1', '2'],
      status: 'done',
      number: 1,
      createdAt: '2022-02-02T02:02:02Z',
      name: 'test',
      updatedAt: '2022-02-02T02:02:02Z'
    }
  ],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

describe('Тестирование feedsSlice', () => {
  it('should return the initial state', () => {
    expect(feedsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('Тестирование ordersSelector', () => {
    testStore.dispatch({
      type: getFeedsList.fulfilled.type,
      payload: feedsData
    });
    const state = testStore.getState();
    it('Тестирование ordersSelector', () => {
      const result = ordersSelector(state);
      expect(result).toEqual(state.feeds.orders);
    });
    it('Тестирование totalSelector ', () => {
      const result = totalSelector(state);
      expect(result).toEqual(state.feeds.total);
    });
    it('Тестирование totalTodaySelector ', () => {
      const result = totalTodaySelector(state);
      expect(result).toEqual(state.feeds.totalToday);
    });
    it('Тестирование isLoadingSelector', () => {
      const result = isLoadingSelector(state);
      expect(result).toEqual(state.feeds.loading);
    });
    it('Тестирование errorSelector', () => {
      const result = errorSelector(state);
      expect(result).toEqual(state.feeds.error);
    });
  });

  describe('Тестирование extraReducers', () => {
    it('Тестирование pending', () => {
      testStore.dispatch({
        type: getFeedsList.pending.type
      });
      const state = store.getState();
      expect(state.feeds?.loading).toBe(true);
      expect(state.feeds?.error).toBe(null);
    });
    it('Тестирование fulfilled ', () => {
      testStore.dispatch({
        type: getFeedsList.fulfilled.type,
        payload: feedsData
      });
      const state = store.getState();
      expect(state.feeds.orders).toEqual([]);
      expect(state.feeds.total).toBe(0);
      expect(state.feeds.totalToday).toBe(0);
      expect(state.feeds.loading).toBe(true);
    });
    it('Тестирование rejected', () => {
      const errorMassage = 'error';
      testStore.dispatch({
        type: getFeedsList.rejected.type,
        error: { postMessage: errorMassage }
      });
      const state = store.getState();
      expect(state.feeds.orders).toEqual([]);
      expect(state.feeds.total).toBe(0);
      expect(state.feeds.totalToday).toBe(0);
      expect(state.feeds.loading).toBe(true);
      expect(state.feeds.error).toBe(null);
    });
  });
});
