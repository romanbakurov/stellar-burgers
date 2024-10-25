import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  clearConstructor,
  constructorBurgerSelector
} from '../../services/slices/burgerConstructorSlice';
import { isAuthCheckedSelector } from '../../services/slices/userSlice';
import {
  addOrder,
  resetOrder,
  orderModalDataSelector,
  orderRequestSelector
} from '../../services/slices/addOrderSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(
    constructorBurgerSelector.constructorItems
  );
  const isAuth = useSelector(isAuthCheckedSelector);

  const orderRequest = useSelector(orderRequestSelector);

  const orderModalData = useSelector(orderModalDataSelector);

  const onOrderClick = () => {
    if (!isAuth) {
      return navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;

    const order = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id)
    ];

    dispatch(addOrder(order));
  };
  const closeOrderModal = () => {
    dispatch(resetOrder());
    dispatch(clearConstructor());
    navigate('/', { replace: true });
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
