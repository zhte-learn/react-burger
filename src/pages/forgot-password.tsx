import React from 'react';
import { Link } from 'react-router-dom';
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './styles.module.css';

import { forgotPassword } from '../services/user/actions';
import { useAppSelector, useAppDispatch } from '../services/hooks';

export const ForgotPassword = () => {
  const [ email, setEmail ] = React.useState('');
  const dispatch = useAppDispatch();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(forgotPassword(email));
    setEmail('');
  }

  return(
    <section className={styles.authContainer}>
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>

      <form className={styles.form} action="submit" onSubmit={handleSubmit}>
        <EmailInput
          onChange={handleInputChange}
          value={email}
          placeholder={'Укажите e-mail'}
          name={'email'}
          isIcon={false}
          extraClass="mt-6"
          disabled={false}
        />

        <Button 
          htmlType="submit" 
          type="primary" 
          size="large" 
          extraClass="mt-6"
          disabled={!email}
        >
            Восстановить
        </Button>
      </form>

      <div className={`${styles.actions} mt-20`}>
        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
        <Link to='/login' className="text text_type_main-default text_color_accent">Войти</Link>
      </div>
    </section>
  )
}