import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { burgerConstructorReducer } from './slices/burgerConstructorSlice';
import { ingredientsSliceReducer } from './slices/burgerIngredientsSlice';
import { userReducer } from './slices/userSlice';

const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  burgerIngredients: ingredientsSliceReducer,
  user: userReducer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
