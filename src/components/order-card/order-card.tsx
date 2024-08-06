import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks';
import PriceBlock from '../price-block/price-block';
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import styles from './order-card.module.css';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { countIngredients, countTotalPrice, getOrderByNumber } from '../../utils/handlers';

const LIMIT = 6;

type TOrderCardProps = {
  orderNumber: string;
  page: string;
}

const OrderCard = ({ orderNumber, page }: TOrderCardProps): JSX.Element => {
  const location = useLocation();
  const { ingredientsMap } = useAppSelector(state => state.ingredients);
  const feed = useAppSelector(state => (page === 'feed' ? state.feed : state.feedProfile));
  const orders = feed.orders; 
  const order = getOrderByNumber(orders, orderNumber);
  let capacity = LIMIT + 1;

  const today: Date = new Date();
  const orderDate: Date = new Date(order!.createdAt);

  function getDifferenceInDays(): number {
    const differenceInMilliseconds: number = today.getTime() - orderDate.getTime();
    return Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  }

  return (
    <>
    {order &&
      <Link
        className={`${styles.container} p-6`}
        to={`${location.pathname}/${orderNumber}`}
        state={{ background: location }}
      >
        <div className={styles.orderData}>
          <p className='orderNumber text text_type_digits-default'>{`#${orderNumber}`}</p>
          
          {getDifferenceInDays() == 0 &&
            <FormattedDate
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
          }
          {getDifferenceInDays() == 1 &&
            <FormattedDate
              date={
                new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate() - 1,
                  today.getHours(),
                  today.getMinutes() - 1,
                  0,
                )
              }
            />
          }
          {getDifferenceInDays() > 1 &&
            <FormattedDate
              date={
                new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate() - getDifferenceInDays(),
                  today.getHours(),
                  today.getMinutes() - 1,
                  0,
                )
              }
            />
          }
        </div>

        <h3 className='text text_type_main-medium mt-6'>{order.name}</h3>
        <p className={`text text_type_main-small mt-2 ${(order.status === 'done') ? styles.completeColor : ''}`}>
          {(order.status === 'done') ? 'Выполнен' : 'Готовится'}
        </p>

        <div className={`${styles.orderMain} mt-6`}>
          <ul className={styles.ingredientsGroup}>
            {order.ingredients.slice(0, LIMIT).map((id, index) => {
              capacity = capacity - 1;
              const isLast = (index === LIMIT - 1);
              return ( 
                <li 
                  key={index}
                  style={{
                    zIndex: capacity, 
                    marginLeft: -10,
                  }}
                  className={styles.ingredientItem}
                >
                  <IngredientIcon id={id} isLast={isLast} hiddenNumber={order.ingredients.length - LIMIT} />
                </li>
              ) 
            })}
          </ul>
          
          <PriceBlock 
            price={countTotalPrice(countIngredients(order.ingredients), ingredientsMap)} 
            size='small'
          />
        </div>
      </Link>
    }
    </>
  )
}

export default OrderCard;
