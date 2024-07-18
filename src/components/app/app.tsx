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
import { FeedPage } from '../../pages/feed-page';
import OrdersList from '../orders-list/orders-list';
import ProfileDetails from '../profile-details/profile-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
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
    navigate(background.pathname, { replace: true });
    //remove fixed position of background when modal is closed
    document.body.style.overflow = "unset";
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
                    <Route path='/profile/orders/:id'
                      element={<OrderDetails />} />
                    <Route path='/login' element={<OnlyUnAuth component={<LoginPage/>}/>} />
                    <Route path='/register' element={<OnlyUnAuth component={<RegisterPage/>}/>} />
                    <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPassword/>}/>} />
                    <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPassword/>}/>} />
                    <Route path='/profile' element={<OnlyAuth component={<ProfilePage/>}/>}>
                      <Route index element={<OnlyAuth component={<ProfileDetails/>}/>}/>
                      <Route path='orders' element={<OnlyAuth component={<OrdersList/>}/>} />
                    </Route>
                    <Route path='/feed' element={<FeedPage/>} />
                  </Routes>

                  {background && (
                    <Routes>
                      {background.pathname === '/' &&
                        <Route
                          path='/ingredients/:ingredientId'
                          element={
                            <Modal onClose={handleCloseModal}>
                              <IngredientDetails />
                            </Modal>
                          }
                        />
                      }
                      {background.pathname === '/feed' &&
                        <Route
                          path='/feed/:number'
                          element={
                            <Modal onClose={handleCloseModal}>
                              <OrderDetails />
                            </Modal>
                          }
                        />
                      }
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
