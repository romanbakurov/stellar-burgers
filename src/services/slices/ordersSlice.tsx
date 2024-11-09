import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '@api';

export const getOrdersList = createAsyncThunk('orders/getOrders', getOrdersApi);

export type TOrdersState = {
  orders: Array<TOrder>;
  loading: boolean;
};

export const initialState: TOrdersState = {
  orders: [],
  loading: false
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getOrdersListSelector: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersList.pending, (state) => {
        state.loading = true;
        state.orders = [];
      })
      .addCase(getOrdersList.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrdersList.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { getOrdersListSelector } = ordersSlice.selectors;
export const ordersReducer = ordersSlice.reducer;
