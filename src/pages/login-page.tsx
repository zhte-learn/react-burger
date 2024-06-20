import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { EmailInput, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './styles.module.css';
import { useAppSelector, useAppDispatch } from '../services/hooks';
import { login } from '../services/user/actions';
import Loader from '../components/loader/loader';

export const LoginPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { isLoading, isFailed, error } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
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
    
    if(localStorage.getItem("accessToken")) {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }

  return(
    <section className={styles.authContainer}>
      <h2 className="text text_type_main-medium">Вход</h2>
      {isFailed && <p className="text text_type_main-medium">{error.message}</p>}
      
      {isLoading ? <Loader/> 
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
        </form>
      )}
      

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