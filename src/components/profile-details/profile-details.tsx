import React from 'react';
import styles from './profile-details.module.css';
import Loader from '../loader/loader';
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { TUser } from '../../utils/custom-types';

import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { updateUserDetails } from '../../services/user/actions';

function ProfileDetails() {
  const { user, status, error } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const [ name, setName ] = React.useState(() => user!.name);
  const [ email, setEmail ] = React.useState(() => user!.email);
  const [ password, setPassword ] = React.useState(() => user!.password);
  const [ isPasswordChanged, setIsPasswordChanged ] = React.useState(false);
  const [ errorMessage, setErrorMessage ] = React.useState('');
  const isDataChanged = user?.email !== email || user?.name !== name || isPasswordChanged;

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
    setErrorMessage('');
  }

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    setErrorMessage('');
  }

  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    setIsPasswordChanged(true);
    setErrorMessage('');
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  function handleConfirm() {
    if(isPasswordChanged) {
      dispatch(updateUserDetails({ name, email, password } as TUser));
    } else {
      dispatch(updateUserDetails({ name, email } as TUser));
    }
  }

  function handleReset() {
    setName(user!.name);
    setEmail(user!.email);
    setPassword(user!.password);
  }

  const inputRef = React.useRef<HTMLInputElement>(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current!.focus(), 0);
  }

  React.useEffect(() => {
    if(error) {
      setErrorMessage(error.message);
    }
  }, [error]);

  return(
    <>
      {status === 'failed' && <p className="text text_type_main-medium">{errorMessage}</p>}

      {status === 'loading' ? <Loader /> 
      : (
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
          
          {isDataChanged && (
            <div className={`${styles.actions} mt-6`}>
              <Button 
                htmlType="button" 
                type="secondary" 
                size="medium" 
                onClick={handleReset}>
                  Отмена
              </Button>

              <Button 
                htmlType="button" 
                type="primary" 
                size="medium" 
                onClick={handleConfirm}>
                  Сохранить
              </Button>
            </div>
          )}
        </form>
      )}
    </>
  )
}

export default ProfileDetails;
