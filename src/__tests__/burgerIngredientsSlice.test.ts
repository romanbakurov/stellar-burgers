import { configureStore } from '@reduxjs/toolkit';
import {
  getIngredientsSelector,
  getIngredientsLoadingSelector,
  getIngredientsStateSelector,
  ingredientsSliceReducer,
  getIngredientsList,
  initialState
} from '../services/slices/burgerIngredientsSlice';

const ingredientsData = {
  ingredients: [
    {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0942',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
    }
  ],
  loading: false,
  error: null
};

const testStore = () =>
  configureStore({
    reducer: {
      burgerIngredients: ingredientsSliceReducer
    }
  });

describe('burgerIngredientsSlice', () => {
  it('should return the initial state', () => {
    const store = testStore();
    expect(store.getState().burgerIngredients).toEqual(initialState);
  });

  describe('selectors', () => {
    it('getIngredientsSelector', () => {
      const state = {
        burgerIngredients: ingredientsData
      };
      const result = getIngredientsSelector(state);
      expect(result).toEqual(ingredientsData.ingredients);
    });

    it('getIngredientsLoadingSelector', () => {
      const state = {
        burgerIngredients: {
          loading: true,
          ingredients: [],
          error: null
        }
      };
      const isLoading = getIngredientsLoadingSelector(state);
      expect(isLoading).toBe(true);
    });

    it('getIngredientsStateSelector', () => {
      const state = {
        burgerIngredients: ingredientsData
      };
      const result = getIngredientsStateSelector(state);
      expect(result).toEqual(ingredientsData);
    });
  });

  describe('extraReducers', () => {
    it('pending', () => {
      const store = testStore();
      store.dispatch(getIngredientsList());

      const result = store.getState().burgerIngredients;
      expect(result).toEqual({
        ...initialState,
        loading: true
      });
    });

    it('rejected', () => {
      const store = testStore();
      const errorMessage = 'error';
      store.dispatch({
        type: getIngredientsList.rejected.type,
        payload: errorMessage,
        error: {
          message: errorMessage
        }
      });

      const result = store.getState().burgerIngredients;
      expect(result.loading).toBe(false);
      expect(result.error).toBe(errorMessage);
    });

    it('fulfilled', () => {
      const store = testStore();
      store.dispatch({
        type: getIngredientsList.fulfilled.type,
        payload: ingredientsData.ingredients
      });

      const result = store.getState().burgerIngredients;
      expect(result.loading).toBe(false);
      expect(result.ingredients).toEqual(ingredientsData.ingredients);
    });
  });
});
