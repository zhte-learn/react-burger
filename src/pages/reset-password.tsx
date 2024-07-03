import React from 'react';
import { Link, Navigate } from 'react-router-dom';

import Loader from '../components/loader/loader';
import styles from './styles.module.css';
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { useAppSelector, useAppDispatch } from '../services/hooks';
import { resetPassword } from '../services/user/actions';
import { clearStatus } from '../services/user/reducer';
import { useForm } from '../hooks/use-form';
import { TResetForm } from '../utils/custom-types';

export const ResetPassword = () => {
  const [ errorMessage, setErrorMessage ] = React.useState<string>('');
  //to prevent redirection to the next page if state.status is success from previous page
  const [ hasMount, setHasMount ] = React.useState<boolean>(true);

  const dispatch = useAppDispatch();
  const { error, status } = useAppSelector(state => state.user);
  const {values, handleChange, clearForm} = useForm<TResetForm>({ 
    password: '',
    token: '',
  });

  //remove errors and status state from the previous page
  React.useEffect(() => {
    dispatch(clearStatus());
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleChange(e);
    setErrorMessage(''); //remove error message if user starts typing
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    dispatch(resetPassword(values));
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
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>

      {status === 'failed' && <p className="text text_type_main-medium mt-6">{errorMessage}</p>}

      {(status === 'success' && !hasMount) && <Navigate to='/login' replace={true} />}

      {status === 'loading'
        ? <Loader />
        : (
        <form className={styles.form} action="submit" onSubmit={handleSubmit}>
          <PasswordInput
            onChange={handleInputChange}
            placeholder={'Введите новый пароль'}
            value={values.password}
            name={'password'}
            extraClass="mt-6"
          />

          <Input 
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={handleInputChange}
            icon={undefined}
            value={values.token}
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
            disabled={!values.password && !values.token}>
              Сохранить
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
