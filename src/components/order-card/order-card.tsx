import { Link, useLocation } from 'react-router-dom';
import PriceBlock from '../price-block/price-block';
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import styles from './order-card.module.css';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

const LIMIT = 6;
const today = new Date();

type OrderCardProps = {
  orderId: string;
  burgerName: string;
  status: string;
  ingredientIds: string[];
  price: number;
}

const OrderCard = ({ orderId, burgerName, status, ingredientIds, price }: OrderCardProps): JSX.Element => {
  let capacity = LIMIT + 1;
  const ingredientsToShow = ingredientIds.slice(0, 6);
  const ingredientsToHide = ingredientIds.length - LIMIT;
  const location = useLocation();
  
  return (
    <Link
      className={`${styles.container} p-6`}
      to={`${location.pathname}/${orderId}`}
      state={{ background: location }}
    >
      <div className={styles.orderData}>
        <p className='orderNumber text text_type_digits-default'>{`#${orderId}`}</p>
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
      </div>

      <h3 className='text text_type_main-medium mt-6'>{burgerName}</h3>
      <p className='text text_type_main-small mt-2'>{status}</p>

      <div className={`${styles.orderMain} mt-6`}>
        <ul className={styles.ingredientsGroup}>
          {ingredientsToShow.map((id, index) => {
            capacity = capacity - 1;
            const isLast = (index === LIMIT - 1);
            return ( 
              <li 
                key={id}
                style={{
                  zIndex: capacity, 
                  marginLeft: -10,
                }}
                className={styles.ingredientItem}
              >
                <IngredientIcon id={id} isLast={isLast} hiddenNumber={ingredientsToHide} />
              </li>
            ) 
          })}
        </ul>
        
        <PriceBlock price={price} size='small'/>
      </div>
      </Link>
  )
}

export default OrderCard;
