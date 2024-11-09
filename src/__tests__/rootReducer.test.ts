import { rootReducer } from '../services/store';
import { describe } from '@jest/globals';
import { initialState as burgerConstructorInitialState } from '../services/slices/burgerConstructorSlice';
import { initialState as burgerIngredientsInitialState } from '../services/slices/burgerIngredientsSlice';
import { initialState as userInitialState } from '../services/slices/userSlice';
import { initialState as feedsInitialState } from '../services/slices/feedsSlice';
import { initialState as ordersInitialState } from '../services/slices/ordersSlice';
import { initialState as addOrderInitialState } from '../services/slices/addOrderSlice';

describe('Тестирование редьюсера', () => {
  it('Тестирование редьюсера', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(initialState).toEqual({
      burgerConstructor: burgerConstructorInitialState,
      burgerIngredients: burgerIngredientsInitialState,
      user: userInitialState,
      feeds: feedsInitialState,
      orders: ordersInitialState,
      addOrder: addOrderInitialState
    });
  });
});
