import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';

import Loader from '../components/loader/loader';
import { Input, EmailInput, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './styles.module.css';

import { useAppSelector, useAppDispatch } from '../services/hooks';
import { register } from '../services/user/actions';
import { clearStatus } from '../services/user/reducer';
import { useForm } from '../hooks/use-form';
import { TUserForm } from '../utils/custom-types';

export const RegisterPage = () => {
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const { status, error } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {values, handleChange, clearForm} = useForm<TUserForm>({ 
    name: '', 
    email: '', 
    password: ''
  });

  //remove errors and status state from the previous page
  React.useEffect(() => {
    dispatch(clearStatus());
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleChange(e);
    setErrorMessage(''); //remove error message if user starts typing
  }
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(register(values));
    clearForm();
  }

  React.useEffect(() => {
    if(error) {
      setErrorMessage(error.message);
    }
  }, [error]);

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
            onChange={handleInputChange}
            icon={undefined}
            value={values.name}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mt-6"
            onPointerEnterCapture={()=>{}}
            onPointerLeaveCapture={()=>{}}
          />

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
            disabled={!values.email || !values.name || !values.password}>
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
