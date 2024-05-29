import React from "react";
import ingredientsStyles from './burger-ingredients.module.css';
import IngredientsGroup from "./ingredients-group/ingredients-group";
import BurgerIngredient from "../../utils/ingredient-interface";
import { useAppSelector, useAppDispatch } from '../../services/hooks';

interface BurgerIngredientsProps {
  ingredients: BurgerIngredient[],
  onIngredientClick: () => void
}

function BurgerIngredients( props: BurgerIngredientsProps ) {
  
  const dispatch = useAppDispatch();

  const ingredientsByType = React.useMemo(() => {
    return { 
      bun: getItemsByType(props.ingredients, "bun"),
      sauce: getItemsByType(props.ingredients, "sauce"),
      main: getItemsByType(props.ingredients, "main"),
    };
  }, [props.ingredients]);

  function getItemsByType(data: BurgerIngredient[], type: string) {
    return data.filter(item => item.type === type);
  }

  return(
    <section className={`${ingredientsStyles.container} pl-5 pr-5 mt-10 mb-15`}>
      <h2 className={`${ingredientsStyles.title} text text_type_main-large mb-5`}>Соберите бургер</h2>
      <ul className={`${ingredientsStyles.nav} mb-10`}>
        <li className={`${ingredientsStyles.navItem} ${ingredientsStyles.navItem_active} text text_type_main-small`}>
          Булки
        </li>
        <li className={`${ingredientsStyles.navItem} text text_type_main-small text_color_inactive`}>
          Соусы
        </li>
        <li className={`${ingredientsStyles.navItem} text text_type_main-small text_color_inactive`}>
          Начинки
        </li>
      </ul>

      <div className={ ingredientsStyles.content }>
        <IngredientsGroup 
          groupTitle={'Булки'}
          ingredients={ingredientsByType.bun}
          onIngredientClick={props.onIngredientClick}
        /> 
        <IngredientsGroup 
          groupTitle={'Соусы'} 
          ingredients={ingredientsByType.sauce}
          onIngredientClick={props.onIngredientClick}
        />
        <IngredientsGroup 
          groupTitle={'Начинки'} 
          ingredients={ingredientsByType.main}
          onIngredientClick={props.onIngredientClick}
        />
      </div>
      
    </section>
  )
}

export default BurgerIngredients;
