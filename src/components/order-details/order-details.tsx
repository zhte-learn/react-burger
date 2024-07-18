import { useParams } from 'react-router-dom';
import styles from './order-details.module.css';
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import PriceBlock from '../price-block/price-block';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../services/hooks';

import { orders } from './../../utils/data';

const today = new Date();

function countIngredients(ids: string[]) {
  const dict = new Map<string, number>();
  ids.forEach(id => {
    if(!dict.has(id)) {
      dict.set(id, 0);
    }
    dict.set(id, dict.get(id)! + 1);
  })
  return dict;
}

const OrderDetails = (): JSX.Element => {
  const { ingredientsMap } = useAppSelector(state => state.ingredients);
  const { number } = useParams<"number">();
  const order = orders.filter(item => item.orderId === number)[0];
  const ingredientsToDisplay = countIngredients(order.ingredientIds);

  function countTotalPrice(){
    let total = 0;
    ingredientsToDisplay.forEach((num, id) => {
      total += ingredientsMap[id].price * num;
    })
    return total;
  }
  
  return (
    <div className={styles.container}>
      <p className={`${styles.orderNumber} text text_type_digits-default`}>{`#${number}`}</p>
      <p className="text text_type_main-medium mt-10">{order.burgerName}</p>
      <p className={`text text_type_main-small mt-3 ${styles.completeColor}`}>Выполнен</p>
      <p className="text text_type_main-medium mt-15">Состав:</p>
      
      <ul className={`${styles.ingredientsList} mt-6`}>
        {Array.from(ingredientsToDisplay, ([id, counter]) => {
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
          date={
            new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate(),
              today.getHours(),
              today.getMinutes() - 1,
              0,
            )
          }
        />
        <PriceBlock price={countTotalPrice()} size={'small'}/>
      </div>
    </div>
  )
}

export default OrderDetails;
