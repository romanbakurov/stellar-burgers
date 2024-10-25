import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeedsList, ordersSelector } from '../../services/slices/feedsSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(ordersSelector);

  useEffect(() => {
    dispatch(getFeedsList());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  <FeedUI
    orders={orders}
    handleGetFeeds={() => {
      dispatch(getFeedsList());
    }}
  />;
};
