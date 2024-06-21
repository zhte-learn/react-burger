import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';

import Loader from '../components/loader/loader';
import { EmailInput, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './styles.module.css';

import { useAppSelector, useAppDispatch } from '../services/hooks';
import { login } from '../services/user/actions';
import { clearStatus } from '../services/user/reducer';

export const LoginPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [ errorMessage, setErrorMessage ] = React.useState('');
  //to prevent redirection to the next page if state.status is success from previous page
  const [ hasMount, setHasMount ] = React.useState(true);

  const { status, error } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const location = useLocation();
  // const from = location.state?.from?.pathname;
  // console.log(from);

  //remove errors and status state from the previous page
  React.useEffect(() => {
    dispatch(clearStatus());
  }, []);
  
  function onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    setErrorMessage('');
  }

  function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    setErrorMessage('');
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    dispatch(login({email: email, password: password}));

    setHasMount(false);

    setEmail('');
    setPassword('');
  
    // const res = await dispatch(login({email: email, password: password}));
    // const payload = res.payload as TLoginResponse;
    // if(payload.success) {
    //   const from = location.state?.from?.pathname || "/";
    //   navigate(from, { replace: true });
    // } else {
    //   setErrorMessage(payload.message);
    // }

    // if(localStorage.getItem("accessToken")) {
    //   const from = location.state?.from?.pathname || "/";
    //   navigate(from, { replace: true });
    // }
  }

  React.useEffect(() => {
    if(error) {
      setErrorMessage(error.message);
    }
  }, [error]);

  return(
    <section className={styles.authContainer}>
      <h2 className="text text_type_main-medium">Вход</h2>

      {status === 'failed' && <p className="text text_type_main-medium">{errorMessage}</p>}

      {(status === 'success' && !hasMount) && <Navigate to={'/'} replace={true} />}

      {status === 'loading' ? <Loader/> 
      : (
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
        </form>)
      }

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
