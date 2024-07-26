import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './order-details.module.css';
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import PriceBlock from '../price-block/price-block';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector, useAppDispatch} from '../../services/hooks';
import { getOrderByNumber } from '../../services/order/actions';
import { countIngredients, countTotalPrice, getOrderByNumber as getOrder, getDays } from '../../utils/handlers';
import Loader from '../loader/loader';

const OrderDetails = (): JSX.Element => {
  const { ingredientsMap } = useAppSelector(state => state.ingredients);
  const { number } = useParams<"number">();
  const dispatch = useAppDispatch();
  
  const order = useAppSelector(state => {
    let orders = state.feed.orders;
    let currentOrder = getOrder(orders, number!);
    if(currentOrder) {
      return currentOrder;
    }

    orders = state.feedProfile.orders;
    currentOrder = getOrder(orders, number!);
    if(currentOrder) {
      return currentOrder;
    }

    return state.order.currentOrder;
  })

  useEffect(() => {
    if(!order) {
      dispatch(getOrderByNumber(number!.toString()));
    }
  }, []);

  return (
    <>
      {(!order && order != undefined) && <Loader />}

      {order && (
        <div className={styles.container}>
          <p className={`${styles.orderNumber} text text_type_digits-default`}>{`#${number}`}</p>
          <p className="text text_type_main-medium mt-10">{order.name}</p>
          <p className={`text text_type_main-small mt-3 ${(order.status === 'done') ? styles.completeColor : ''}`}>
            {(order.status === 'done') ? 'Выполнен' : 'Готовится'}
          </p>
          <p className="text text_type_main-medium mt-15">Состав:</p>
          
          <ul className={`${styles.ingredientsList} mt-6`}>
            {Array.from(countIngredients(order.ingredients), ([id, counter]) => {
              return (
                <li key={id} className={styles.ingredientItem}>
                  <div className={styles.ingredientDetails}>
                    <IngredientIcon id={id} />
                    <p className="text text_type_main-default ml-4">{ingredientsMap[id].name}</p>
                  </div>
                  <div className={styles.priceDetails}>
                    <p className="text text_type_digits-default">{counter}&nbsp;x&nbsp;</p>
                    <PriceBlock price={ingredientsMap[id].price} size={'small'}/>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className={`${styles.finalDetails} mt-10`}>
            <FormattedDate
              className='text text_type_main-small text_color_inactive'
              date={getDays(order)}
            />
            <PriceBlock 
              price={countTotalPrice(countIngredients(order.ingredients), ingredientsMap)} 
              size={'small'}
            />
          </div>
        </div>
      )}
      
      {order === undefined && <p className="text text_type_main-medium mt-6">Sorry, order #{number} doesn't exist</p>}
    </>
  )
}

export default OrderDetails;
