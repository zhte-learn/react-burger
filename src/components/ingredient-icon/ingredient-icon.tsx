import styles from './ingredient-icon.module.css';
import { useAppSelector } from '../../services/hooks';

type TIngredientIconProps = {
  id: string;
  isLast?: boolean;
  hiddenNumber?: number;
}

const IngredientIcon = ({ id, isLast, hiddenNumber }: TIngredientIconProps): JSX.Element => {
  const { ingredientsMap } = useAppSelector(state => state.ingredients);

  return (
    <div className={styles.imageContainer}>
      <div className={styles.imageBorder}>
        <img 
          className={styles.image} 
          src={ingredientsMap[id].image_mobile}
          style={{...(isLast && (hiddenNumber! > 0) && {opacity: 0.6})}}
        />
        {(isLast && (hiddenNumber! > 0)) && (
          <p className={`${styles.adds} text text_type_digits-default`}>{`+${hiddenNumber}`}</p>
        )}
      </div>
    </div>
  )
}

export default IngredientIcon;
