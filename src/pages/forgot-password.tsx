import React from 'react';
import { Link, Navigate } from 'react-router-dom';

import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from '../components/loader/loader';
import styles from './styles.module.css';

import { useAppSelector, useAppDispatch } from '../services/hooks';
import { forgotPassword } from '../services/user/actions';
import { clearStatus } from '../services/user/reducer';

export const ForgotPassword = () => {
  const [ email, setEmail ] = React.useState('');
  const [ errorMessage, setErrorMessage ] = React.useState('');
  //to prevent redirection to the next page if state.status is success from previous page
  const [ hasMount, setHasMount ] = React.useState(true);

  const { status, error } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  
  //remove errors and status state from the previous page
  React.useEffect(() => {
    dispatch(clearStatus());
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    setErrorMessage(''); //remove error message if user starts typing
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    dispatch(forgotPassword(email));
    setHasMount(false);

    if(error) {
      setErrorMessage(error.message);
    }
    setEmail('');
  }

  return(
    <section className={styles.authContainer}>
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>

      {status === 'failed' && <p className="text text_type_main-medium mt-6">{errorMessage}</p>}

      {(status === 'success' && !hasMount) && <Navigate to='/reset-password' replace={true} />}

      {status === 'loading' 
        ? <Loader /> 
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
              disabled={!email}>
                Восстановить
            </Button>
          </form>
        )
      }

      <div className={`${styles.actions} mt-20`}>
        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
        <Link to='/login' className="text text_type_main-default text_color_accent">Войти</Link>
      </div>
    </section>
  )
}
