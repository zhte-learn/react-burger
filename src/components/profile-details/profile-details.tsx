import React from 'react';
import styles from './profile-details.module.css';
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { updateUserDetails } from '../../services/user/actions';
import Loader from '../loader/loader';
import ErrorDetails from '../error-details';

function ProfileDetails() {
  const { user, isLoading, isFailed, errorMessage } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [ name, setName ] = React.useState(() => user?.name || '');
  const [ email, setEmail ] = React.useState(() => user?.email || '');
  const [ password, setPassword ] = React.useState(() => user?.password || '');

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  function handleConfirm() {
    dispatch(updateUserDetails({ name, email, password }));
  }

  function handleReset() {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setPassword(user?.password || '');
  }

  const inputRef = React.useRef<HTMLInputElement>(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current!.focus(), 0);
  }

  return(
    <>
      <ErrorDetails />

      <form className={styles.form} action="submit" onSubmit={handleSubmit}>
        <Input 
          type={'text'}
          placeholder={'Имя'}
          onChange={handleChangeName}
          icon={'EditIcon'}
          value={name ?? ""}
          name={'name'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          onPointerEnterCapture={()=>{}}
          onPointerLeaveCapture={()=>{}}
        />
        <EmailInput
          onChange={handleChangeEmail}
          value={email ?? ""}
          name={'email'}
          placeholder='Логин'
          isIcon={true}
          extraClass='mt-6'
        />
        <PasswordInput
          onChange={handleChangePassword}
          value={password ?? "*****"}
          name={'password'}
          icon="EditIcon"
          extraClass='mt-6'
        />
        <div className={`${styles.actions} mt-6`}>
          <Button htmlType="button" type="secondary" size="medium" onClick={handleReset}>
            Отмена
          </Button>
          <Button htmlType="button" type="primary" size="medium" onClick={handleConfirm}>
            Сохранить
          </Button>
        </div>
      </form>
    </>
  )
}

export default ProfileDetails;
