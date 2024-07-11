import OrderCard from '../../components/order-card/order-card';
import styles from './orders-list.module.css';

const orders = [
  {number: "034535", burgerName: "Death Star Starship Main бургер", status: "Создан", ingredientIds: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa093e"], price: 480},
  {number: "034536", burgerName: "Interstellar бургер", status: "Готовится", ingredientIds: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa093e", "643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa093e", "643d69a5c3f7b9001cfa093e", "643d69a5c3f7b9001cfa093e"], price: 1290},
  {number: "034537", burgerName: "Black Hole Singularity острый бургер", status: "Выполнен", ingredientIds: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa093e"], price: 2370},
]

const OrdersList = (): JSX.Element => {
  return (
    <div className={styles.container}>
      {orders.map(order => (
        <OrderCard key={order.number} number={order.number} burgerName={order.burgerName} status={order.status} ingredientIds={order.ingredientIds} price={order.price}/>
      ))}
    </div>
  )
}

export default OrdersList;
