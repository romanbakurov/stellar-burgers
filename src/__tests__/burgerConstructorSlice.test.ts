import { TConstructorIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';
import {
  addToIngredient,
  removeIngredient,
  clearConstructor,
  moveIngredientDown,
  moveIngredientUp,
  initialState,
  burgerConstructorReducer as reducer,
  TBurgerConstructorState,
  constructorBurgerSelector
} from '../services/slices/burgerConstructorSlice';

jest.mock('uuid', () => ({
  v4: jest.fn()
}));

const mockUuid = 'uuid';

const ingredientData = {
  _id: '643d69a5c3f7b9001cfa0941',
  id: mockUuid,
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

const ingredientsData: TConstructorIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa093e',
    id: mockUuid,
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
    id: mockUuid,
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
];

describe('Тест редьюсера слайса burgerConstructorSlice', () => {
  beforeEach(() => {
    (uuidv4 as jest.Mock).mockReturnValue(mockUuid);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  it('constructorBurgerSelector', () => {
    const state = { burgerConstructor: initialState };
    const result = constructorBurgerSelector.constructorItems(state);

    expect(result).toEqual(initialState);
  });

  it('добавить ингредиент в конструктор', () => {
    const action = addToIngredient(ingredientData);
    const expectedState = reducer(initialState, action);

    expect(expectedState.ingredients).toHaveLength(1);
    expect(expectedState.ingredients[0]).toEqual(ingredientData);
  });

  it('удалить ингредиент из конструктора', () => {
    const action = removeIngredient(ingredientData);
    const expectedState = reducer(initialState, action);

    expect(expectedState.ingredients).toHaveLength(0);
    expect(expectedState.bun).toBeNull();
  });

  it('очистить конструктор', () => {
    const action = clearConstructor();
    const expectedState = reducer(initialState, action);

    expect(expectedState.ingredients).toHaveLength(0);
    expect(expectedState.bun).toBeNull();
  });

  it('переместить ингредиент вверх', () => {
    const movedIngredient: TBurgerConstructorState = {
      bun: null,
      ingredients: [...ingredientsData]
    };
    const action = moveIngredientUp(1);
    const expectedState = reducer(movedIngredient, action);

    expect(expectedState.ingredients[1]).toEqual(ingredientsData[0]);
    expect(expectedState.ingredients[0]).toEqual(ingredientsData[1]);
  });

  it('переместить ингредиент вниз', () => {
    const movedIngredient: TBurgerConstructorState = {
      bun: null,
      ingredients: [...ingredientsData]
    };
    const action = moveIngredientDown(0);
    const expectedState = reducer(movedIngredient, action);

    expect(expectedState.ingredients[0]).toEqual(ingredientsData[1]);
    expect(expectedState.ingredients[1]).toEqual(ingredientsData[0]);
  });
});
