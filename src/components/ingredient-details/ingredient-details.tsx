import React from "react";
import ingredientDetailsStyles from './ingredient-details.module.css';

interface IngredientDetailsProps {
  image: string | undefined,
  name: string | undefined,
  fat: number | undefined,
  carbohydrates: number | undefined,
  calories: number | undefined,
  proteins: number | undefined,
}

function IngredientDetails(props: IngredientDetailsProps) {
  return(
    <>
      <img 
        className={ ingredientDetailsStyles.image }
        src={ props.image } 
        alt={ props.name } 
      />

      <div className={ingredientDetailsStyles.content}>
        <h3 className={`${ingredientDetailsStyles.title} text text_type_main-medium`}>
          {props.name}
        </h3>
        <ul className={`${ingredientDetailsStyles.details} mt-8`}>
          <li className={ingredientDetailsStyles.detailsItem}>
            <p className={`text text_type_main-small text_color_inactive`}>
              Калории,ккал
            </p>
            <span className={`text text_type_digits-default text_color_inactive`}>
              {props.calories}
            </span>
          </li>
          <li className={ingredientDetailsStyles.detailsItem}>
            <p className={`text text_type_main-small text_color_inactive`}>
              Белки, г
            </p>
            <span className={`text text_type_digits-default text_color_inactive`}>
              {props.proteins}
            </span>
          </li>
          <li className={ingredientDetailsStyles.detailsItem}>
            <p className={`text text_type_main-small text_color_inactive`}>
              Жиры, г
            </p>
            <span className={`text text_type_digits-default text_color_inactive`}>
              {props.fat}
            </span>
          </li>
          <li className={ingredientDetailsStyles.detailsItem}>
            <p className={`text text_type_main-small text_color_inactive`}>
              Углеводы, г
            </p>
            <span className={`text text_type_digits-default text_color_inactive`}>
              {props.carbohydrates}
            </span>
          </li>
        </ul>
      </div>
    </>
  )
}

export default IngredientDetails;