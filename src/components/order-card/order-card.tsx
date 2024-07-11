import PriceBlock from '../price-block/price-block';
import styles from './order-card.module.css';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../services/hooks';

const LIMIT = 6;
const today = new Date();

type OrderCardProps = {
  number: string;
  burgerName: string;
  status: string;
  ingredientIds: string[];
  price: number;
}

const OrderCard = ({ number, burgerName, status, ingredientIds, price }: OrderCardProps): JSX.Element => {
  let capacity = LIMIT + 1;
  const { ingredients } = useAppSelector(state => state.ingredients);
  const ingredientsToShow = ingredientIds.slice(0, 6);
  const ingredientsToHide = ingredientIds.length - LIMIT;

  function getImageUrl(id: string): string {
    const ingredient = ingredients.find(elem => elem._id === id);
    return ingredient ? ingredient.image_mobile : "";
  }
  
  return (
    <div className={`${styles.container} p-6`}>
      <div className={styles.orderData}>
        <p className='orderNumber text text_type_digits-default'>{`#${number}`}</p>
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
        <div className={styles.ingredientIcons}>
          {ingredientsToShow.map((id, index) => {
            capacity = capacity - 1;
            const isLast = (index === LIMIT - 1);
            return ( 
              <div 
                key={id}
                style={{
                  zIndex: capacity, 
                  marginLeft: -10,
                }}
                className={styles.imageContainer}
              >
                <div className={styles.imageBorder}>
                  <img 
                    className={styles.image} 
                    src={getImageUrl(id)} 
                    style={{...(isLast && {opacity: 0.6})}}
                  />
                  {isLast && (
                    <p className={`${styles.adds} text text_type_digits-default`}>{`+${ingredientsToHide}`}</p>
                  )}
                </div>
              </div>
            ) 
          })}
        </div>
        
        <PriceBlock price={price} size='small'/>
      </div>
      </div>
  )
}

export default OrderCard;