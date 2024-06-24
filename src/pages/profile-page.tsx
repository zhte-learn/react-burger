import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './styles.module.css';

import { useAppDispatch } from '../services/hooks';
import { logout } from '../services/user/actions';
import { clearStatus } from '../services/user/reducer';

export const ProfilePage = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  //remove errors and status state from the previous page
  React.useEffect(() => {
    dispatch(clearStatus());
  }, []);
  
  function handleLogout() {
    dispatch(logout());
  }

  return(
    <section className={`${styles.profileContainer} pl-5 pr-5 mt-20`}>
      <nav className={styles.profileNav}>
        <NavLink 
          to='/profile'
          end
          className={({ isActive }) =>
            `${styles.profileLink} text text_type_main-medium pt-4 pb-4 ${isActive ? `${styles.activeLink}` : 'text_color_inactive'}`
          }
        >
          Профиль
        </NavLink>
        <NavLink 
          to ='/profile/orders'
          className={({ isActive }) =>
            `${styles.profileLink} text text_type_main-medium pt-4 pb-4 ${isActive ? `${styles.activeLink}` : ''}`
          }
        >
          История заказов
        </NavLink>
        <Button 
          htmlType="button" 
          type="secondary" 
          size="large"
          onClick={handleLogout}
          className= {`${styles.buttonExit} text_type_main-medium text_color_inactive pt-4 pb-4`}>
            Выход
        </Button>

        {location.pathname === '/profile' && (
          <div className={`${styles.profileInfo} mt-20`}>
            <p className="text text_type_main-default text_color_inactive">
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </div>
        )}
      </nav>

      <Outlet />
    
    </section>
  )
}