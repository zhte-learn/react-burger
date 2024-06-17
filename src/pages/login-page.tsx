import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/loader/loader';
import { EmailInput, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './styles.module.css';
import { useAppSelector, useAppDispatch } from '../services/hooks';
import { login } from '../services/user/actions';
//import { clearState } from '../services/login/reducer';

export const LoginPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useAppDispatch();
  // const { accessToken,
  //   refreshToken,
  //   loginFailed,
  //   loginLoading,
  //   loginError } 
  //   = useAppSelector(state => state.login);

  function onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    //dispatch(clearState());
    setEmail(e.target.value);
  }

  function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    //dispatch(clearState());
    setPassword(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(login({email: email, password: password}));
  }

  return(
    <section className={styles.authContainer}>
      <h2 className="text text_type_main-medium">Вход</h2>

      <form className={styles.form} action="submit" onSubmit={handleSubmit}>
        <EmailInput
          onChange={onEmailChange}
          value={email}
          name={'email'}
          isIcon={false}
          extraClass="mt-6"
          disabled={false}
        />

        <PasswordInput
          onChange={onPasswordChange}
          value={password}
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

      <div className={`${styles.extraInfo} mt-6`}>
        {/* {loginFailed && 
          <p className="text text_type_main-medium">{loginError}</p>
        }

        {loginLoading && 
          <Loader />     
        }   */}
      </div>

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