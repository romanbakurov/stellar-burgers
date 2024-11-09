import { configureStore } from '@reduxjs/toolkit';
import {
  getOrdersList,
  TOrdersState,
  getOrdersListSelector,
  initialState,
  ordersReducer
} from '../services/slices/ordersSlice';

const ordersData: TOrdersState = {
  orders: [
    {
      _id: '66fad4f207d06e001c3719c3',
      name: 'Флюоресцентный люминесцентный био-марсианский бургер',
      number: 54710,
      status: 'done',
      createdAt: '2024-09-30T16:42:26.241Z',
      updatedAt: '2024-09-30T16:42:27.058Z',
      ingredients: [
        '60d3b41abdacab0026a733c6',
        '60d3b41abdacab0026a733c7',
        '60d3b41abdacab0026a733c8',
        '60d3b41abdacab0026a733c9',
        '60d3b41abdacab0026a733ca'
      ]
    }
  ],
  loading: false
};

const testStore = () =>
  configureStore({
    reducer: {
      orders: ordersReducer
    }
  });

describe('ordersSlice', () => {
  it('Тестирование initial state', () => {
    const store = testStore();
    expect(store.getState().orders).toEqual(initialState);
  });
  describe('Тестирование selectors', () => {
    it('Тестирование getOrdersListSelector', () => {
      const store = testStore();
      const state = store.getState();
      expect(getOrdersListSelector(state)).toEqual([ordersData.orders[1]]);
    });
  });

  describe('Тестирование extraReducers', () => {
    const store = testStore();
    it('pending', () => {
      store.dispatch({
        type: getOrdersList.pending.type
      });
      const state = store.getState();
      expect(state.orders.loading).toEqual(true);
    });
    it('fulfilled', () => {
      store.dispatch({
        type: getOrdersList.fulfilled.type,
        payload: ordersData.orders
      });
      const state = store.getState();
      expect(state.orders.loading).toEqual(false);
      expect(state.orders.orders).toEqual(ordersData.orders);
    });
    it('rejected', () => {
      store.dispatch({
        type: getOrdersList.rejected.type
      });
      const state = store.getState();
      expect(state.orders.loading).toEqual(false);
    });
  });
});
