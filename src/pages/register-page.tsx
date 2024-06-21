import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';

import Loader from '../components/loader/loader';
import { Input, EmailInput, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './styles.module.css';

import { useAppSelector, useAppDispatch } from '../services/hooks';
import { register } from '../services/user/actions';
import { clearStatus } from '../services/user/reducer';

export const RegisterPage = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const { status, error } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  //remove errors and status state from the previous page
  React.useEffect(() => {
    dispatch(clearStatus());
  }, []);
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(register({email: email, password: password, name: name}));
    
    setName('');
    setEmail('');
    setPassword('');
    // const res = await dispatch(register({name: name, email: email, password: password}));
    // const payload = res.payload as TRegisterResponse;
    // if(payload.success) {
    //   const from = location.state?.from?.pathname || "/";
    //   navigate(from, { replace: true });
    // } else {
    //   setErrorMessage(payload.message);
    // }
  }

  React.useEffect(() => {
    if(error) {
      setErrorMessage(error.message);
    }
  }, [error]);

  function onNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
    setErrorMessage('');
  }

  function onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    setErrorMessage('');
  }

  function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    setErrorMessage('');
  }

  return(
    <section className={styles.authContainer}>
      <h2 className="text text_type_main-medium">Регистрация</h2>

      {status === 'failed' && <p className="text text_type_main-medium">{errorMessage}</p>}

      {status === 'success' && <Navigate to={from ? from : '/'} replace={true} />}

      {status === 'loading' ? <Loader />
      : (
        <form className={styles.form} action="submit" onSubmit={handleSubmit}>
          <Input 
            type={'text'}
            placeholder={'Имя'}
            onChange={onNameChange}
            icon={undefined}
            value={name}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mt-6"
            onPointerEnterCapture={()=>{}}
            onPointerLeaveCapture={()=>{}}
          />

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
            extraClass="mt-6"
            disabled={!email || !name || !password}>
              Зарегистрироваться
          </Button>
        </form>
      )}

      <div className={`${styles.actions} mt-20`}>
        <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
        <Link to='/login' className="text text_type_main-default text_color_accent">Войти</Link>
      </div>

    </section>
  )
}
