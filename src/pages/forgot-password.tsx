import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from '../components/loader/loader';
import { useAppSelector } from '../services/hooks';
import styles from './styles.module.css';

import { forgotPassword } from '../services/user/actions';
import { useAppDispatch } from '../services/hooks';

interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export const ForgotPassword = () => {
  const [ email, setEmail ] = React.useState('');
  const [ errorMessage, setErrorMessage ] = React.useState('');

  const { isLoading } = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    setErrorMessage(''); //remove a message if user starts to type in input
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const res = await dispatch(forgotPassword(email)) as { payload: ForgotPasswordResponse };
    setEmail('');

    if (res.payload.success) {
      navigate('/reset-password', { replace: true });
    } else {
      setErrorMessage(res.payload.message);
    }
  }

  return(
    <section className={styles.authContainer}>
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>

      {errorMessage && <p className="text text_type_main-medium mt-6">{errorMessage}</p>}

      {isLoading ? <Loader />
      : (
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
      )}

      <div className={`${styles.actions} mt-20`}>
        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
        <Link to='/login' className="text text_type_main-default text_color_accent">Войти</Link>
      </div>
    </section>
  )
}
