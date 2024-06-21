import React from 'react';
import { Link, Navigate } from 'react-router-dom';

import Loader from '../components/loader/loader';
import styles from './styles.module.css';
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { useAppSelector, useAppDispatch } from '../services/hooks';
import { resetPassword } from '../services/user/actions';
import { clearStatus } from '../services/user/reducer';

export const ResetPassword = () => {
  const [ password, setPassword ] = React.useState('');
  const [ token, setToken ] = React.useState('');
  const [ errorMessage, setErrorMessage ] = React.useState('');
  //to prevent redirection to the next page if state.status is success from previous page
  const [ hasMount, setHasMount ] = React.useState(true);

  const dispatch = useAppDispatch();
  const { error, status } = useAppSelector(state => state.user);

  //remove errors and status state from the previous page
  React.useEffect(() => {
    dispatch(clearStatus());
  }, []);

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    setErrorMessage(''); //remove error message if user starts typing
  }

  function handleTokenChange(e: React.ChangeEvent<HTMLInputElement>) {
    setToken(e.target.value);
    setErrorMessage(''); //remove error message if user starts typing
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    
    dispatch(resetPassword({ password: password, token: token }));
    setHasMount(false);

    if(error) {
      setErrorMessage(error.message);
    }

    setPassword('');
    setToken('');

    // const res = await dispatch(resetPassword({ password: password, token: token }));
    // const payload = res.payload as TResetPasswordResponse;
    // if (payload.success) {
    //   navigate('/login', { replace: true });
    // } else {
    //   setErrorMessage(payload.message);
    // }
  }

  return(
    <section className={styles.authContainer}>
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>

      {status === 'failed' && <p className="text text_type_main-medium mt-6">{error.message}</p>}

      {(status === 'success' && !hasMount) && <Navigate to='/login' replace={true} />}

      {status === 'loading'
        ? <Loader />
        : (
        <form className={styles.form} action="submit" onSubmit={handleSubmit}>
          <PasswordInput
            onChange={handlePasswordChange}
            placeholder={'Введите новый пароль'}
            value={password}
            name={'password'}
            extraClass="mt-6"
          />

          <Input 
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={handleTokenChange}
            icon={undefined}
            value={token}
            name={'token'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mt-6"
            onPointerEnterCapture={()=>{}}
            onPointerLeaveCapture={()=>{}}
          />

          <Button 
            htmlType="submit" 
            type="primary" 
            size="large" 
            extraClass="mt-6"
            disabled={!password && !token}>
              Сохранить
          </Button>
        </form>
        )}
      
      {errorMessage && <p className="text text_type_main-medium mt-6">{errorMessage}</p>}
  
      <div className={`${styles.actions} mt-20`}>
        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
        <Link to='/login' className="text text_type_main-default text_color_accent">Войти</Link>
      </div>
    </section>
  )
}
