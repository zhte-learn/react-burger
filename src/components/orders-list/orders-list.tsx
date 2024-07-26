import OrderCard from '../../components/order-card/order-card';
import styles from './orders-list.module.css';
import { useAppSelector } from '../../services/hooks';
import { TOrder } from '../../utils/custom-types';

type TOrderListProps = {
  page: string;
}

const OrdersList = ({ page }: TOrderListProps): JSX.Element => {
  const { ingredientsMap } = useAppSelector(state => state.ingredients);
  const feed = useAppSelector(state => (page === 'feed' ? state.feed : state.feedProfile));
  const orders = feed.orders;

  function isOrderValid(order: TOrder) {
    //check invalid options in a list of ingredients
    const isNullOrEmpty = order.ingredients.some(el => (el === null || el === ''));
    if(isNullOrEmpty) {
      return false;
    }

    if(!order.number || !order.createdAt || !order.status) {
      return false;
    }

    if(order.ingredients.length < 3) {
      return false;
    }

    //assume that valid order is an order where first and last ingredients are buns
    const firstIngredient = order.ingredients[0];
    const lastIngredient = order.ingredients[order.ingredients.length - 1];
    if(ingredientsMap[firstIngredient].type != 'bun' || ingredientsMap[lastIngredient].type != 'bun') {
      return false;
    }
    if(ingredientsMap[firstIngredient].name != ingredientsMap[lastIngredient].name) {
      return false;
    }
    return true;
  }

  return (
    <ul className={styles.container}>
      {orders.length === 0 && 
        <p className="text text_type_main-medium mt-4">You have not placed any order :(</p>
      }
      {orders.length > 0 &&
        orders.map(order => (
          isOrderValid(order) 
            ? <OrderCard key={order.number} orderNumber={order.number} page={page}/> 
            : null
        ))
      }
    </ul>
  )
}

export default OrdersList;
