import React from 'react';
import itemStyles from './constructor-item.module.css';
import PriceBlock from '../../price-block/price-block';
import BurgerIngredient from "../../../utils/ingredient-interface";
import { LockIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IngredientItemProps {
  ingredient: BurgerIngredient,
  name: string,
  onIngredientClick: (ingredient: BurgerIngredient) => void,
  position: string
}

function ConstructorItem(props: IngredientItemProps) {
  const shapeStyle = 
    props.position === 'top' ? itemStyles.shapeTop :
    props.position === 'bottom' ? itemStyles.shapeBottom :
    itemStyles.shapeMid;

  function handleClick() {
    props.onIngredientClick(props.ingredient);
  };

  return(
    <>
      <div className={`${ itemStyles.item } ${shapeStyle} pl-6 pt-4 pb-4 pr-8 ml-1`} >
        <div className={`${itemStyles.subBlock}`} onClick={ handleClick }>
          <img className={`${ itemStyles.image }`} src={ props.ingredient.image_mobile } alt={ props.ingredient.name } />
          <p className={`${itemStyles.name} text text_type_main-small ml-5`}>{ props.name }</p>
        </div>
  
        <div className={ itemStyles.subBlock }>
          <PriceBlock size={'small'} price={ props.ingredient.price}/>
          { 
            props.ingredient.type !== 'bun'
            ? <DeleteIcon type="primary" />
            : <LockIcon type="secondary" />
          }
        </div>
        
      </div>
    </>
  )
}

export default ConstructorItem;