import React from 'react';
import { Link } from 'react-router-dom';
import { Input, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './styles.module.css';

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = React.useState('profile');

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
        <li 
          className={`${styles.profileLink} text_type_main-medium pt-4 pb-4`}
          //onClick={() => handleClick('profile')}
        >
          Профиль
        </li>
        <Link 
          to ='/profile/orders' 
          className={`${styles.profileLink} text_type_main-medium pt-4 pb-4 text_color_inactive`} 
          //onClick={() => handleClick('history')}
        >
          История заказов
        </Link>
        <Link 
          to='/login' 
          className= {`${styles.profileLink} text_type_main-medium text_color_inactive pt-4 pb-4`}>
            Выход
        </Link>

        <div className={`${styles.profileInfo} mt-20`}>
          <p className="text text_type_main-default text_color_inactive">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
      </nav>

      <form className={styles.form} action="submit">
        <Input 
          type={'text'}
          placeholder={'Имя'}
          onChange={onChange}
          icon={'EditIcon'}
          value={'Anna'}
          name={'name'}
          error={false}
          disabled={true}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          onPointerEnterCapture={()=>{}}
          onPointerLeaveCapture={()=>{}}
        />
        <EmailInput
          onChange={onChange}
          value={'345@mail.ru'}
          name={'email'}
          placeholder='Логин'
          isIcon={true}
          extraClass='mt-6'
        />
        <PasswordInput
          onChange={onChange}
          value={'12345'}
          name={'password'}
          icon="EditIcon"
          extraClass='mt-6'
        />
      </form>
    </section>
  )
}