import { useParams } from 'react-router-dom';

import ingredientDetailsStyles from './ingredient-details.module.css';
import { useAppSelector } from '../../services/hooks';

function IngredientDetails() {
  const { ingredients} = useAppSelector(state => state.ingredients);

  let { ingredientId } = useParams<"ingredientId">();
  let ingredient = ingredients.filter(item => item._id === ingredientId)[0];

  return(
    <>
      <img 
        className={ ingredientDetailsStyles.image }
        src={ ingredient.image } 
        alt={ ingredient.name } 
      />

      <div className={ingredientDetailsStyles.content}>
        <h3 className={`${ingredientDetailsStyles.title} text text_type_main-medium`}>
          {ingredient.name}
        </h3>
        <ul className={`${ingredientDetailsStyles.details} mt-8`}>
          <li className={ingredientDetailsStyles.detailsItem}>
            <p className={`text text_type_main-small text_color_inactive`}>
              Калории,ккал
            </p>
            <span className={`text text_type_digits-default text_color_inactive`}>
              {ingredient.calories}
            </span>
          </li>
          <li className={ingredientDetailsStyles.detailsItem}>
            <p className={`text text_type_main-small text_color_inactive`}>
              Белки, г
            </p>
            <span className={`text text_type_digits-default text_color_inactive`}>
              {ingredient.proteins}
            </span>
          </li>
          <li className={ingredientDetailsStyles.detailsItem}>
            <p className={`text text_type_main-small text_color_inactive`}>
              Жиры, г
            </p>
            <span className={`text text_type_digits-default text_color_inactive`}>
              {ingredient.fat}
            </span>
          </li>
          <li className={ingredientDetailsStyles.detailsItem}>
            <p className={`text text_type_main-small text_color_inactive`}>
              Углеводы, г
            </p>
            <span className={`text text_type_digits-default text_color_inactive`}>
              {ingredient.carbohydrates}
            </span>
          </li>
        </ul>
      </div>
    </>
  )
}

export default IngredientDetails;
