import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const addOrder = createAsyncThunk(
  'addOrder/createOrder',
  orderBurgerApi
);

export type TAddOrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | undefined;
};

export const initialState: TAddOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: undefined
};

export const addOrderSlice = createSlice({
  name: 'addOrder',
  initialState,
  reducers: {
    resetOrder: (state) => (state = initialState)
  },
  selectors: {
    orderRequestSelector: (state) => state.orderRequest,
    orderModalDataSelector: (state) => state.orderModalData,
    errorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      });
  }
});

export const { resetOrder } = addOrderSlice.actions;
export const { orderRequestSelector, orderModalDataSelector, errorSelector } =
  addOrderSlice.selectors;
export const addOrderReducer = addOrderSlice.reducer;
