import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

import styles from './styles.module.css';
import { useAppDispatch } from '../services/hooks';
import { logout } from '../services/user/actions';

export const ProfilePage = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  
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
        <Link 
          to='/login' 
          onClick={handleLogout}
          className= {`${styles.profileLink} text_type_main-medium text_color_inactive pt-4 pb-4`}>
            Выход
        </Link>

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