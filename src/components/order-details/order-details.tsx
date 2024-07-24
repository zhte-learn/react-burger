import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './order-details.module.css';
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import PriceBlock from '../price-block/price-block';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../services/hooks';
import { countIngredients, countTotalPrice, getOrderByNumber, getDays } from '../../utils/handlers';
import { TOrder } from '../../utils/custom-types';

import { api } from '../../utils/api';
import Loader from '../loader/loader';

const OrderDetails = (): JSX.Element => {
  const { ingredientsMap } = useAppSelector(state => state.ingredients);
  const { number } = useParams<"number">();
  const feed = useAppSelector(state => state.feed);
  const orders = feed.orders;

  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ order, setOrder ] = useState<TOrder | null>(null);
  const [ isOrder, setIsOrder ] = useState<boolean>(true);

  const fetchOrder = async () => {
    return await api.getOrder(number!);
  };

  useEffect(() => {
    const orderInFeed = getOrderByNumber(orders, number!);
    if(orderInFeed) {
      setOrder(orderInFeed);
      setIsLoading(false);
    } else {
      fetchOrder()
        .then(res => {
          if(res.orders.length > 0) {
            setOrder(res.orders[0]);
            setIsLoading(false);
          } else {
            setIsOrder(false);
            setIsLoading(false);
          }
        })
        .catch(err => console.log(err));
    }
  }, []);

  return (
    <>
      {isLoading && <Loader />}

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
      {(!isOrder) && (
        <p className="text text_type_main-medium mt-6">Sorry, order #{number} doesn't exist</p>
      )}
    </>
  )
}

export default OrderDetails;
