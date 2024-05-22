import React from 'react';
import header from './header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header>
      <div className={ header.container }>
        <ul className={ header.nav }>
          <div className={ header.group }>
            <li className={`${ header.navItem } pl-5 pr-5`}>
              <BurgerIcon type="primary" />
              <p className="text text_type_main-small pl-2">Конструктор</p>
            </li>
            <li className={`${ header.navItem } pl-5 pr-5`}>
              <ListIcon type="primary" />
              <p className="text text_type_main-small pl-2">Лента Заказов</p>
            </li>
          </div>
          <li className={`${ header.navItem } pl-5 pr-5`}>
            <ProfileIcon type="primary" />
            <p className="text text_type_main-small pl-2">Личный кабинет</p>
          </li>
        </ul>  
      </div>
      <a className={ header.logo } href="#">
        <Logo />
      </a>    
    </header>
    
  )
}

export default AppHeader;
