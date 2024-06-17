import React from 'react';
import header from './header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

function AppHeader() {
  return (
    <header>
      <div className={header.container}>
        <ul className={header.nav}>
          <NavLink to='/' className={`${header.navItem} pl-5 pr-5`}>
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                <p className={`text text_type_main-small pl-2 ${isActive ? '' : 'text_color_inactive'}`}>
                  Конструктор
                </p>
              </>
            )}
          </NavLink>
          <NavLink to='/' className={`${header.navItem} ${header.orders} pl-5 pr-5`}>
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <p className={`text text_type_main-small pl-2 ${isActive ? '' : 'text_color_inactive'}`}>
                  Лента Заказов
                </p>
              </>
            )}
          </NavLink>
          <NavLink to='/' className={`${header.navItem} ${header.logo} pl-5 pr-5`}>
            <Logo />  
          </NavLink>
          <NavLink to='/profile' className={`${header.navItem} ${header.login} pl-5 pr-5`}>
            {({ isActive }) => (
              <>
                <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                <p className={`text text_type_main-small pl-2 ${isActive ? '' : 'text_color_inactive'}`}>
                  Личный кабинет
                </p>
              </>
            )}
          </NavLink>
        </ul>  
      </div>
    </header>
    
  )
}

export default AppHeader;
