import React from "react";

import itemStyles from './ingredient-item.module.css';
import PriceBlock from "../../price-block/price-block";
import BurgerIngredient from "../../../utils/ingredient-interface";
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector, useAppDispatch } from '../../../services/hooks';
import { selectIngredient } from "../../../services/selected-ingredient/actions";


interface IngredientItemProps {
  ingredient: BurgerIngredient,
  onIngredientClick: () => void
}

function IngredientItem(props: IngredientItemProps) {
  const dispatch = useAppDispatch();
  
  function handleClick() {
    
    //console.log(props.ingredient);
    dispatch(selectIngredient(props.ingredient));
    props.onIngredientClick();
  };

  return (
    <>
      <li 
        className={`${ itemStyles.item } mb-8`}
        onClick={ handleClick }
      >
        <img src={ props.ingredient.image } alt={ props.ingredient.name } />
        <PriceBlock size="small" price={20} />
        <p className={`${ itemStyles.name } pt-1 text text_type_main-small`}>
          {props.ingredient.name}
        </p>
        <Counter count={1} size="default" extraClass="m-1" />
      </li>    
    </>
  )
}

export default IngredientItem;