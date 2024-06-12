import React from 'react';
import { Link } from 'react-router-dom';
import { Input, EmailInput, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './styles.module.css';

export const LoginPage = () => {
  const [email, setEmail] = React.useState('');

  function onChange() {
    console.log("click");
  }

  return(
    <section className={styles.authContainer}>
      <h2 className="text text_type_main-medium">Вход</h2>

      <form className={styles.form} action="submit">
        <EmailInput
          onChange={onChange}
          value={''}
          name={'email'}
          isIcon={false}
          extraClass="mt-6"
          disabled={false}
        />

        <PasswordInput
          onChange={onChange}
          value={''}
          name={'password'}
          extraClass="mt-6"
        />

        <Button 
          htmlType="submit" 
          type="primary" 
          size="large" 
          extraClass="mt-6">
            Войти
        </Button>
      </form>

      <div className={`${styles.actions} mt-20`}>
        <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?</p>
        <Link to='/register' className="text text_type_main-default text_color_accent">Зарегистрироваться</Link>
      </div>

      <div className={`${styles.actions} mt-1`}>
        <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
        <Link to='/forgot-password' className="text text_type_main-default text_color_accent">Восстановить пароль</Link>
      </div>
    </section>
  )
}