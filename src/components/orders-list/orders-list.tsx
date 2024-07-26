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
  console.log(feed);

  function isOrderValid(order: TOrder) {
    console.log("before " + order.number);
    //check invalid options in a list of ingredients
    const isNullOrEmpty = order.ingredients.some(el => (el === null || el === ''));
    if(isNullOrEmpty) {
      console.log("isNullOrEmpty " + order.number);
      return false;
    }

    if(!order.number || !order.createdAt || !order.status) {
      console.log("!order.number || !order.createdAt || !order.status " + order.number);
      return false;
    }

    if(order.ingredients.length < 3) {
      console.log("order.ingredients.length < 3 " + order.number);
      return false;
    }

    //assume that valid order is an order where first and last ingredients are buns
    const firstIngredient = order.ingredients[0];
    const lastIngredient = order.ingredients[order.ingredients.length - 1];
    if(ingredientsMap[firstIngredient].type != 'bun' || ingredientsMap[lastIngredient].type != 'bun') {
      console.log("ingredientsMap[firstIngredient].type != 'bun' " + order.number);
      return false;
    }
    if(ingredientsMap[firstIngredient].name != ingredientsMap[lastIngredient].name) {
      console.log("ingredientsMap[firstIngredient].name != ingredientsMap[lastIngredient].name " + order.number);
      return false;
    }
    console.log("after " + order.number);
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
