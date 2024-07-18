import styles from './ingredient-icon.module.css';
//import { BurgerIngredient } from '../../utils/custom-types';
import { useAppSelector } from '../../services/hooks';

// function getImageUrl(id: string, ingredients: BurgerIngredient[]): string {
//   const ingredient = ingredients.find(elem => elem._id === id);
//   return ingredient ? ingredient.image_mobile : "";
// }

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
          //src={getImageUrl(id, ingredients)} 
          src={ingredientsMap[id].image_mobile}
          style={{...(isLast && {opacity: 0.6})}}
        />
        {isLast && (
          <p className={`${styles.adds} text text_type_digits-default`}>{`+${hiddenNumber}`}</p>
        )}
      </div>
    </div>
  )
}

export default IngredientIcon;
