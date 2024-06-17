import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import styles from './app.module.css';

import AppHeader from '../header/header';
import Loader from '../loader/loader';

import { getIngredients } from '../../services/ingredients/actions';
import { checkUserAuth, refreshToken } from '../../services/user/actions';
import { useAppSelector, useAppDispatch } from '../../services/hooks';

import { LoginPage } from '../../pages/login-page';
import { MainPage } from '../../pages/main-page';
import { RegisterPage } from '../../pages/register-page';
import { ForgotPassword } from '../../pages/forgot-password';
import { ResetPassword } from '../../pages/reset-password';
import { ProfilePage } from '../../pages/profile-page';
import { OrderPage } from '../../pages/orders-page';
import ProfileDetails from '../profile-details/profile-details';
import { OnlyAuth, OnlyUnAuth } from '../protected-route';

const MINUTE_MS = 1200000

function App() {
  const dispatch = useAppDispatch();
  const { ingredients, 
          ingredientsLoading, 
          ingredientsRequestFailed, 
          ingredientsError } 
          = useAppSelector(state => state.ingredients);
  
  React.useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      refreshToken()
    }, MINUTE_MS);
    return () => clearInterval(interval); 
  }, []);

  return (  
    <BrowserRouter>
      <div className={styles.page}>
        <AppHeader />
        {ingredientsRequestFailed 
          ? (
            <>
              <div>Что-то пошло не так</div>
              <div>{ingredientsError}</div>
            </>
            ) 
          : ingredientsLoading 
            ? <Loader />
            : ingredients && ingredients.length 
              ? (
                <main className={styles.mainContainer}>
                  <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/login' element={<OnlyUnAuth component={<LoginPage/>}/>} />
                    <Route path='/register' element={<OnlyUnAuth component={<RegisterPage/>}/>} />
                    <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPassword/>}/>} />
                    <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPassword/>}/>} />
                    <Route path='/profile' element={<OnlyAuth component={<ProfilePage/>}/>}>
                      <Route index element={<OnlyAuth component={<ProfileDetails/>}/>}/>
                      <Route path='orders' element={<OnlyAuth component={<OrderPage/>}/>} />
                    </Route>
                  </Routes>
                </main>
                ) 
              : <p>No ingredients...</p>
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
