import OrderCard from '../../components/order-card/order-card';
import styles from './orders-list.module.css';
import { orders } from './../../utils/data';

const OrdersList = (): JSX.Element => {
  return (
    <ul className={styles.container}>
      {orders.map(order => (
        <OrderCard key={order.orderId} orderId={order.orderId} burgerName={order.burgerName} status={order.status} ingredientIds={order.ingredientIds} price={order.price}/>
      ))}
    </ul>
  )
}

export default OrdersList;
