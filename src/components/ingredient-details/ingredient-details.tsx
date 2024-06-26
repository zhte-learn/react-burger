import { FC } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ingredient-details.module.css';
import { useAppSelector } from '../../services/hooks';
import { BurgerIngredient } from '../../utils/custom-types';

const IngredientDetails: FC = () => {
  const { ingredients} = useAppSelector(state => state.ingredients);
  const { ingredientId } = useParams<"ingredientId">();
  const ingredient: BurgerIngredient = ingredients.filter(item => item._id === ingredientId)[0];

  return(
    <section className={styles.container}>
      <h2 className='text text_type_main-large'>Детали ингредиента</h2>

      <img 
        className={styles.image}
        src={ingredient.image} 
        alt={ingredient.name} 
      />

      <h3 className={`${styles.title} text text_type_main-medium`}>
        {ingredient.name}
      </h3>

      <ul className={`${styles.details} mt-8`}>
        <li className={styles.detailsItem}>
          <p className={`text text_type_main-small text_color_inactive`}>
            Калории,ккал
          </p>
          <span className={`text text_type_digits-default text_color_inactive`}>
            {ingredient.calories}
          </span>
        </li>
        <li className={styles.detailsItem}>
          <p className={`text text_type_main-small text_color_inactive`}>
            Белки, г
          </p>
          <span className={`text text_type_digits-default text_color_inactive`}>
            {ingredient.proteins}
          </span>
        </li>
        <li className={styles.detailsItem}>
          <p className={`text text_type_main-small text_color_inactive`}>
            Жиры, г
          </p>
          <span className={`text text_type_digits-default text_color_inactive`}>
            {ingredient.fat}
          </span>
        </li>
        <li className={styles.detailsItem}>
          <p className={`text text_type_main-small text_color_inactive`}>
            Углеводы, г
          </p>
          <span className={`text text_type_digits-default text_color_inactive`}>
            {ingredient.carbohydrates}
          </span>
        </li>
      </ul>
    </section>
  )
}

export default IngredientDetails;
