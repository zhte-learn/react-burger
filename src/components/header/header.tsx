import header from './header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks';

const AppHeader = (): JSX.Element => {
  const { user } = useAppSelector(state => state.user);

  return (
    <header className={header.header}>
      <div className={`${header.container} pr-5 pl-5`}>
        <ul className={header.nav}>
          <NavLink to='/' className={`${header.navItem}`}>
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                <p className={`text text_type_main-small pl-2 ${isActive ? '' : 'text_color_inactive'}`}>
                  Конструктор
                </p>
              </>
            )}
          </NavLink>
          <NavLink to='/feed' className={`${header.navItem} ${header.orders}`}>
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <p className={`text text_type_main-small pl-2 ${isActive ? '' : 'text_color_inactive'}`}>
                  Лента Заказов
                </p>
              </>
            )}
          </NavLink>
          <NavLink to='/' className={`${header.navItem} ${header.logo}`}>
            <Logo />  
          </NavLink>
          <NavLink to='/profile' className={`${header.navItem} ${header.login}`}>
            {({ isActive }) => (
              <>
                <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                <p className={`text text_type_main-small pl-2 ${isActive ? '' : 'text_color_inactive'}`}>
                  {(user) ? user.name :'Личный кабинет'}
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
