import { FC } from 'react';
import { useAppSelector } from '../services/hooks';
import { Navigate, useLocation } from "react-router-dom";
import Loader from './loader/loader';

interface IProtectedProps {
  onlyUnAuth?: boolean;
  component: JSX.Element;
}

// const Protected = ({ onlyUnAuth = false, component }: IProtectedProps): JSX.Element  => {
const Protected: FC<IProtectedProps> = ({ onlyUnAuth = false, component })  => {
  const { isAuthChecked, user } = useAppSelector(state => state.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return (
      <Loader />
    );
  }

  if (onlyUnAuth && user) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  
  // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя
  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: { component: JSX.Element }) => (
  <Protected onlyUnAuth={true} component={component} />
);

// Add this line to ensure the file is treated as a module
export {};
