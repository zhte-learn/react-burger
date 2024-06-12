import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

export const OrderPage = () => {
  const [activeTab, setActiveTab] = React.useState('history');

  const handleClick = (tab: string) => {
    if(tab !== activeTab) {
      setActiveTab(tab);
    }
  }

  function onChange() {
    console.log("click");
  }

  const inputRef = React.useRef<HTMLInputElement>(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current!.focus(), 0);
    console.log("name click");
  }

  return(
    <section className={`${styles.profileContainer} pl-5 pr-5 mt-20`}>
      <nav className={styles.profileNav}>
        <Link 
          to='/profile' 
          className={`${styles.profileLink} text_type_main-medium pt-4 pb-4 text_color_inactive`}
          //onClick={() => handleClick('profile')}
        >
          Профиль
        </Link>
        <li
          className={`${styles.profileLink} text_type_main-medium pt-4 pb-4`} 
          //onClick={() => handleClick('history')}
        >
          История заказов
        </li>
        <Link 
          to='/login' 
          className= {`${styles.profileLink} text_type_main-medium text_color_inactive pt-4 pb-4`}>
            Выход
        </Link>

        {/* <div className={`${styles.profileInfo} mt-20`}>
          <p className="text text_type_main-default text_color_inactive">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div> */}
      </nav>

      <p className='text text_type_main-medium'>Здесь будет история заказов</p>
    </section>
  )
}