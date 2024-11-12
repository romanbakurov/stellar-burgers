import { configureStore } from '@reduxjs/toolkit';
import {
  TAddOrderState,
  resetOrder,
  addOrderReducer,
  addOrder,
  initialState as addOrderInitialState
} from '../services/slices/addOrderSlice';

const orderData: TAddOrderState = {
  orderRequest: true,
  orderModalData: {
    _id: '66fad4f207d06e001c3719c3',
    createdAt: '2024-09-30T16:42:26.241Z',
    status: 'done',
    name: 'Флюоресцентный люминесцентный био-марсианский бургер',
    updatedAt: '2024-09-30T16:42:27.058Z',
    number: 54710,
    ingredients: [
      '60d3b41abdacab0026a733c6',
      '60d3b41abdacab0026a733c7',
      '60d3b41abdacab0026a733c8',
      '60d3b41abdacab0026a733c9',
      '60d3b41abdacab0026a733ca'
    ]
  },
  error: undefined
};

const testStore = () =>
  configureStore({
    reducer: {
      addOrder: addOrderReducer
    }
  });

describe('Тестирование слайса addOrderSlice', () => {
  it('Тестирование initialState', () => {
    const initialState = addOrderReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(initialState).toEqual(addOrderInitialState);
  });

  describe('reducers', () => {
    it('Тестирование resetOrder', () => {
      const store = testStore();
      store.dispatch(resetOrder());
      const state = store.getState();
      expect(state.addOrder).toEqual(addOrderInitialState);
    });
  });

  describe('selectors', () => {
    const store = testStore();
    it('Тестирование orderRequestSelector', () => {
      const state = store.getState().addOrder.orderRequest;
      expect(state).toBe(false);
    });
    it('Тестирование orderModalDataSelector', () => {
      const state = store.getState().addOrder.orderModalData;
      expect(state).toBe(null);
    });
    it('Тестирование errorSelector', () => {
      const state = testStore().getState();
      expect(state.addOrder.error).toEqual(orderData.error);
    });
  });

  describe('extraReducers', () => {
    const store = testStore();
    it('pending', () => {
      store.dispatch({
        type: addOrder.pending.type
      });
      const state = store.getState();
      expect(state.addOrder.orderRequest).toBe(true);
    });
    it('fulfilled', () => {
      store.dispatch({
        type: addOrder.fulfilled.type,
        payload: {
          order: orderData.orderModalData
        }
      });
      const state = store.getState();
      expect(state.addOrder.orderRequest).toBe(false);
      expect(state.addOrder.orderModalData).toEqual(orderData.orderModalData);
    });
    it('rejected', () => {
      const errorMassage = 'error';
      store.dispatch({
        type: addOrder.rejected.type,
        error: { message: errorMassage }
      });
      const state = store.getState();
      expect(state.addOrder.error).toBe(errorMassage);
    });
  });
});
