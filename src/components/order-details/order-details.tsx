import orderDetailsStyles from './order-details.module.css';
import successSign from '../../images/success.png';

interface OrderDetailsProps {
  orderNumber: string,
}

function OrderDetails(props: OrderDetailsProps) {
  return(
    <div className={ orderDetailsStyles.orderContainer }>
      <p className={`${ orderDetailsStyles.orderNumber } text text_type_digits-large`}>
        { props.orderNumber }
      </p>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <img className="mt-15" src={ successSign } alt={ "Подтверждение заказа" } />
      <p className="mt-15 text text_type_main-small">Ваш заказ начали готовить заказа</p>
      <p className="mt-2 text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default OrderDetails;