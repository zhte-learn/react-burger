import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import styles from './app.module.css';

import AppHeader from '../header/header';
import Loader from '../loader/loader';

import { getIngredients } from '../../services/ingredients/actions';
import { useAppSelector, useAppDispatch } from '../../services/hooks';

import { LoginPage } from '../../pages/login-page';
import { MainPage } from '../../pages/main-page';
import { RegisterPage } from '../../pages/register-page';
import { ForgotPassword } from '../../pages/forgot-password';
import { ResetPassword } from '../../pages/reset-password';

function App() {
  const dispatch = useAppDispatch();
  const { ingredients, 
          ingredientsLoading, 
          ingredientsRequestFailed, 
          ingredientsError } 
          = useAppSelector(state => state.ingredients);
  
  React.useEffect(() => {
    dispatch(getIngredients());
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
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path='/reset-password' element={<ResetPassword />} />
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
