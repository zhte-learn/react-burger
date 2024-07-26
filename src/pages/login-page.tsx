import React from 'react';
import { Link, Navigate } from 'react-router-dom';

import Loader from '../components/loader/loader';
import { EmailInput, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './styles.module.css';

import { useAppSelector, useAppDispatch } from '../services/hooks';
import { login } from '../services/user/actions';
import { clearStatus } from '../services/user/reducer';
import { useForm } from '../hooks/use-form';
import { TLoginForm } from '../utils/custom-types';

const LoginPage = (): JSX.Element => {
  const {values, handleChange, clearForm} = useForm<TLoginForm>({  
    email: '', 
    password: '',
  });
  const [ errorMessage, setErrorMessage ] = React.useState<string>('');
  //to prevent redirection to the next page if state.status is success from previous page
  const [ hasMount, setHasMount ] = React.useState<boolean>(true);

  const { status, error } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  // const location = useLocation();
  // const from = location.state?.from?.pathname;

  //remove errors and status state from the previous page
  React.useEffect(() => {
    dispatch(clearStatus());
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    handleChange(e);
    setErrorMessage(''); //remove error message if user starts typing
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    dispatch(login(values));
    setHasMount(false);
    clearForm();
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
            onChange={handleInputChange}
            value={values.email}
            name={'email'}
            isIcon={false}
            extraClass="mt-6"
            disabled={false}
          />

          <PasswordInput
            onChange={handleInputChange}
            value={values.password}
            name={'password'}
            extraClass="mt-6"
          />

          <Button 
            htmlType="submit" 
            type="primary" 
            size="large" 
            extraClass="mt-6"
            disabled={!values.email || !values.password}>
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

export default LoginPage;
