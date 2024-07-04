import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from './app.module.css';

import AppHeader from '../header/header';
import Loader from '../loader/loader';
import Modal from '../modal/modal';

import { getIngredients } from '../../services/ingredients/actions';
import { checkUserAuth } from '../../services/user/actions';
import { useAppSelector, useAppDispatch } from '../../services/hooks';

import { LoginPage } from '../../pages/login-page';
import { MainPage } from '../../pages/main-page';
import { RegisterPage } from '../../pages/register-page';
import { ForgotPassword } from '../../pages/forgot-password';
import { ResetPassword } from '../../pages/reset-password';
import { ProfilePage } from '../../pages/profile-page';
import { OrderPage } from '../../pages/orders-page';
import ProfileDetails from '../profile-details/profile-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { OnlyAuth, OnlyUnAuth } from '../protected-route';

const App = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;
  const dispatch = useAppDispatch();
  const { ingredients, status, error } = useAppSelector(state => state.ingredients);

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, []);

  function handleCloseModal(): void {
    navigate('/', { replace: true });
  }

  return ( 
      <div className={styles.page}>
        <AppHeader />
        {status === 'failed' ? (
            <>
              <div>Что-то пошло не так</div>
              <div>{error}</div>
            </>
            ) 
          : status === 'loading' 
            ? <Loader />
            : ingredients && ingredients.length 
              ? (
                <main className={styles.mainContainer}>
                  <Routes location={background || location}>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/ingredients/:ingredientId'
                      element={<IngredientDetails />} />
                    <Route path='/login' element={<OnlyUnAuth component={<LoginPage/>}/>} />
                    <Route path='/register' element={<OnlyUnAuth component={<RegisterPage/>}/>} />
                    <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPassword/>}/>} />
                    <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPassword/>}/>} />
                    <Route path='/profile' element={<OnlyAuth component={<ProfilePage/>}/>}>
                      <Route index element={<OnlyAuth component={<ProfileDetails/>}/>}/>
                      <Route path='orders' element={<OnlyAuth component={<OrderPage/>}/>} />
                    </Route>
                  </Routes>

                  {background && (
                    <Routes>
                      <Route
                        path='/ingredients/:ingredientId'
                        element={
                          <Modal onClose={handleCloseModal}>
                            <IngredientDetails />
                          </Modal>
                        }
                      />
                    </Routes>
                  )}
                </main>
                ) 
              : <p>No ingredients...</p>
        }
      </div>
  );
}

export default App;
