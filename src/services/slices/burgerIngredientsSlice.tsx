import { TIngredient } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';

export type TBurgerIngredientsState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | undefined;
};

export const initialState: TBurgerIngredientsState = {
  ingredients: [],
  loading: false,
  error: undefined
};

export const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state.ingredients,
    getIngredientsLoading: (state) => state.loading,
    getIngredientsError: (state) => state.error
  }
});

export const ingredientsSliceReducer = burgerIngredientsSlice.reducer;
