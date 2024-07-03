import { useState, useRef, useEffect } from 'react';
import styles from './profile-details.module.css';
import Loader from '../loader/loader';
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { TUser } from '../../utils/custom-types';

import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { updateUserDetails } from '../../services/user/actions';
import { useForm } from '../../hooks/use-form';
import { TUserForm } from '../../utils/custom-types';

const ProfileDetails = (): JSX.Element => {
  const { user, status, error } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const {values, setValues, handleChange} = useForm<TUserForm>({ 
    name: user!.name, 
    email: user!.email, 
    password: user!.password ?? '*****',
  });
  const [ isPasswordChanged, setIsPasswordChanged ] = useState<boolean>(false);
  const [ errorMessage, setErrorMessage ] = useState<string>('');
  
  const isDataChanged: boolean = user?.email !== values.email || user?.name !== values.name || isPasswordChanged;

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    handleChange(e);
    setErrorMessage(''); //remove error message if user starts typing
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
    handleChange(e);
    setIsPasswordChanged(true);
    setErrorMessage(''); //remove error message if user starts typing
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
  }

  function handleConfirm(): void {
    if(isPasswordChanged) {
      dispatch(updateUserDetails(values as TUser));
    } else {
      dispatch(updateUserDetails({ name: values.name, email: values.email } as TUser));
    }
  }

  function handleReset(): void {
    setValues({name: user!.name, email: user!.email, password: '*****'})
  }

  const inputRef = useRef<HTMLInputElement>(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current!.focus(), 0);
  }

  useEffect(() => {
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
            onChange={handleInputChange}
            icon={'EditIcon'}
            value={values.name ?? ""}
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
            onChange={handleInputChange}
            value={values.email ?? ""}
            name={'email'}
            placeholder='Логин'
            isIcon={true}
            extraClass='mt-6'
          />
          <PasswordInput
            onChange={handlePasswordChange}
            value={values.password ?? "*****"}
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
