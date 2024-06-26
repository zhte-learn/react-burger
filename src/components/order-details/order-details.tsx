import { FC } from 'react';
import styles from './order-details.module.css';
import successSign from '../../images/success.png';
import { useAppSelector } from '../../services/hooks';

const OrderDetails: FC = () => {
  const { orderNumber } = useAppSelector(state => state.order);
  
  return(
    <div className={ styles.orderContainer }>
      <p className={`${ styles.orderNumber } text text_type_digits-large`}>
        { orderNumber }
      </p>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <img className="mt-15" src={ successSign } alt={ "Подтверждение заказа" } />
      <p className="mt-15 text text_type_main-small">Ваш заказ начали готовить заказа</p>
      <p className="mt-2 text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default OrderDetails;
