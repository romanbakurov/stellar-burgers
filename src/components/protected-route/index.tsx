import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
// import { userDataSelector, isAuchCheckedSelector } from '../../services/selectors';
import { Navigate, useLocation } from 'react-router';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
};

export const ProtectedRoute = ({ onlyUnAuth, children }: ProtectedRouteProps) =>
  // const isAuthChecked = useSelector(isAuchCheckedSelector);
  // const user = useSelector(userDataSelector);
  // const location = useLocation();

  // if (!isAuthChecked) {
  //     return <Preloader />
  // }

  // if (!onlyUnAuth && !user) {
  //     return <Navigate replace to="/Login" state={{ from: location}}/>;
  // }

  // if (onlyUnAuth && user) {
  //     const from = location.state?.from || { pathname: '/'};
  //     return <Navigate replace to={from} />;
  // }

  children;
