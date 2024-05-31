import React from "react";
import groupStyle from './ingredients-group.module.css';
import BurgerIngredient from "../../../utils/ingredient-interface";
import IngredientItem from "../ingredient-item/ingredient-item";


interface IngredientsGroupProps {
  groupTitle: string,
  ingredients: BurgerIngredient[],
  onIngredientClick: () => void,
  mRef?: React.Ref<HTMLDivElement>;
}

const IngredientsGroup = React.forwardRef<HTMLDivElement, IngredientsGroupProps>((props, ref) => {
  return (
    <div ref={ref} className={ groupStyle.group }>
      <h3 className="text text_type_main-medium mb-6">{ props.groupTitle }</h3>
      <ul className={`${groupStyle.list} pl-4 pr-4 mb-2`}>
        {props.ingredients.map((ingredient) => (
          <IngredientItem 
            key={ ingredient._id } 
            ingredient={ ingredient }
            onIngredientClick = { props.onIngredientClick }
          />
        ))}
      </ul>
    </div>
  )
});

export default IngredientsGroup;