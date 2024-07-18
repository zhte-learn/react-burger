import { useParams } from 'react-router-dom';
import styles from './order-details.module.css';
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import PriceBlock from '../price-block/price-block';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

const order = {orderId: "034535", burgerName: "Death Star Starship Main бургер", status: "Создан", ingredientIds: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa093e", "643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa093e"], price: 480};
const today = new Date();

const OrderDetails = (): JSX.Element => {
  // const { orderNumber } = useAppSelector(state => state.order);
  const { number } = useParams();
  
  return (
    <div className={styles.container}>
      <p className={`${styles.orderNumber} text text_type_digits-default`}>{`#${number}`}</p>
      <p className="text text_type_main-medium mt-10">Black Hole Singularity острый бургер</p>
      <p className={`text text_type_main-small mt-3 ${styles.completeColor}`}>Выполнен</p>
      <p className="text text_type_main-medium mt-15">Состав:</p>
      
      <ul className={`${styles.ingredientsList} mt-6`}>
        {order.ingredientIds.map(ingredientId => {
          return ( 
            <li key={ingredientId} className={styles.ingredientItem}>
              <div className={styles.ingredientDetails}>
                <IngredientIcon id={ingredientId} />
                <p className="text text_type_main-default ml-4">Флюоресцентная булка R2-D3</p>
              </div>
              <div className={styles.priceDetails}>
                <p className="text text_type_digits-default">2&nbsp;x&nbsp;</p>
                <PriceBlock price={210} size={'small'}/>
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
        <PriceBlock price={4020} size={'small'}/>
      </div>
    </div>
  )
}

export default OrderDetails;
