import React from 'react';
import { Link } from 'react-router-dom';
import { Input, EmailInput, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './styles.module.css';

import { useAppSelector, useAppDispatch } from '../services/hooks';
import { register } from '../services/user/actions';
// import { register }  from '../services/register/actions';
// import { clearState } from '../services/register/reducer';
import Loader from '../components/loader/loader';

export const RegisterPage = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useAppDispatch();
  // const { token,
  //   registerFailed,
  //   registerLoading,
  //   registerError } 
  //   = useAppSelector(state => state.register);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(register({email: email, password: password, name: name}));
  }

  function onNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    //dispatch(clearState());
    setName(e.target.value)
  }

  function onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    //dispatch(clearState());
    setEmail(e.target.value);
  }

  function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    //dispatch(clearState());
    setPassword(e.target.value);
  }

  return(
    <section className={styles.authContainer}>
      <h2 className="text text_type_main-medium">Регистрация</h2>

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
          extraClass="mt-6">
            Зарегистрироваться
        </Button>
      </form>

      <div className={`${styles.extraInfo} mt-6`}>
        {/* {registerFailed && 
          <p className="text text_type_main-medium">{registerError}</p>
        }

        {registerLoading && 
          <Loader />      
        }   */}
      </div>

      <div className={`${styles.actions} mt-20`}>
        <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
        <Link to='/login' className="text text_type_main-default text_color_accent">Войти</Link>
      </div>

    </section>
  )
}