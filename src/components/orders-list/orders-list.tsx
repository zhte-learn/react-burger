import OrderCard from '../../components/order-card/order-card';
import styles from './orders-list.module.css';

const orders = [
  {orderId: "034535", burgerName: "Death Star Starship Main бургер", status: "Создан", ingredientIds: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa093e"], price: 480},
  {orderId: "034536", burgerName: "Interstellar бургер", status: "Готовится", ingredientIds: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa093e", "643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa093e", "643d69a5c3f7b9001cfa093e", "643d69a5c3f7b9001cfa093e"], price: 1290},
  {orderId: "034537", burgerName: "Black Hole Singularity острый бургер", status: "Выполнен", ingredientIds: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa093e"], price: 2370},
  {orderId: "034538", burgerName: "Death Star Starship Main бургер", status: "Создан", ingredientIds: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa093e"], price: 480},
  {orderId: "034539", burgerName: "Interstellar бургер", status: "Готовится", ingredientIds: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa093e", "643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa093e", "643d69a5c3f7b9001cfa093e", "643d69a5c3f7b9001cfa093e"], price: 1290},
  {orderId: "034540", burgerName: "Black Hole Singularity острый бургер", status: "Выполнен", ingredientIds: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa093e"], price: 2370},
]

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
