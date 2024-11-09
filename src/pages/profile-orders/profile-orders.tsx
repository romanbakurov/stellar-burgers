import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrdersList,
  getOrdersListSelector
} from '../../services/slices/ordersSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getOrdersListSelector);

  useEffect(() => {
    dispatch(getOrdersList());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
