import { Link } from 'react-router-dom';
import { EmailInput, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './styles.module.css';

export const ForgotPassword = () => {
  function onChange() {
    console.log("click");
  }

  return(
    <section className={styles.authContainer}>
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>

      <form className={styles.form} action="submit">
        <EmailInput
          onChange={onChange}
          value={''}
          placeholder={'Укажите e-mail'}
          name={''}
          isIcon={false}
          extraClass="mt-6"
          disabled={false}
        />

        <Button 
          htmlType="submit" 
          type="primary" 
          size="large" 
          extraClass="mt-6">
            Восстановить
        </Button>
      </form>

      <div className={`${styles.actions} mt-20`}>
        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
        <Link to='/login' className="text text_type_main-default text_color_accent">Войти</Link>
      </div>
    </section>
  )
}