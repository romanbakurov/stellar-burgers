import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

export type TBurgerConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {},
  selectors: {
    constructorItems: (state) => state
  }
});

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
