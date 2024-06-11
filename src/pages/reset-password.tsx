import { Link } from 'react-router-dom';
import { EmailInput, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './styles.module.css';

export const ResetPassword = () => {
  function onChange() {
    console.log("click");
  }

  return(
    <section className={styles.authContainer}>
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>

      <form className={styles.form} action="submit">
        <PasswordInput
          onChange={onChange}
          placeholder={'Введите новый пароль'}
          value={''}
          name={'password'}
          extraClass="mt-6"
        />

        <EmailInput
          onChange={onChange}
          value={''}
          name={''}
          placeholder={'Введите код из письма'}
          isIcon={false}
          extraClass="mt-6"
          disabled={false}
        />

        <Button 
          htmlType="submit" 
          type="primary" 
          size="large" 
          extraClass="mt-6">
            Сохранить
        </Button>
      </form>

      <div className={`${styles.actions} mt-20`}>
        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
        <Link to='/login' className="text text_type_main-default text_color_accent">Войти</Link>
      </div>
    </section>
  )
}