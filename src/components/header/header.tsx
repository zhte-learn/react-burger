import React from 'react';
import { Link } from 'react-router-dom';
import header from './header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header>
      <div className={header.container}>
        <ul className={header.nav}>
          <li className={`${header.navItem} pl-5 pr-5`}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-small pl-2">Конструктор</p>
          </li>
          <li className={`${header.navItem} ${header.orders} pl-5 pr-5`}>
            <ListIcon type="primary" />
            <p className="text text_type_main-small pl-2">Лента Заказов</p>
          </li>
          <li className={`${header.navItem} ${header.logo} pl-5 pr-5`}>
            <Logo />  
          </li>
          <Link to='/profile' className={`${header.navItem} ${header.login} pl-5 pr-5`}>
            <ProfileIcon type="primary" />
            <p className="text text_type_main-small pl-2">Личный кабинет</p>
          </Link>

        </ul>  
      </div>
      {/*<a className={ header.logo } href="#">
        <Logo />
      </a> */}   
    </header>
    
  )
}

export default AppHeader;
