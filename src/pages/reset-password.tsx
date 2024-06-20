import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from '../components/loader/loader';
import styles from './styles.module.css';
import { useAppSelector, useAppDispatch } from '../services/hooks';
import { resetPassword } from '../services/user/actions';

interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export const ResetPassword = () => {
  const [ password, setPassword ] = React.useState('');
  const [ token, setToken ] = React.useState('');
  const [ errorMessage, setErrorMessage ] = React.useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector(state => state.user);

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    setErrorMessage('');
  }

  function handleTokenChange(e: React.ChangeEvent<HTMLInputElement>) {
    setToken(e.target.value);
    setErrorMessage('');
  }


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    //const res = await dispatch(resetPassword({ password: password, token: token })) as { payload: ResetPasswordResponse };
    const res = await dispatch(resetPassword({ password: password, token: token }));
    const payload = res.payload as ResetPasswordResponse;

    setPassword('');
    setToken('');

    if (payload.success) {
      navigate('/login', { replace: true });
    } else {
      setErrorMessage(payload.message);
    }
  }

  return(
    <section className={styles.authContainer}>
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>

      {isLoading 
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
            disabled={!password && !token}
          >
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
