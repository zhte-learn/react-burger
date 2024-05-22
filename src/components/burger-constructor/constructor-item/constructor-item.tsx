import React from 'react';
import item from './constructor-item.module.css';
import PriceBlock from '../../price-block/price-block';
import BurgerIngredient from "../../../utils/ingredient-interface";
import { DragIcon, LockIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IngredientItemProps {
  ingredient: BurgerIngredient,
  name: string,
  onIngredientClick: (ingredient: BurgerIngredient) => void
}

function ConstructorItem(props: IngredientItemProps) {
  const dotsState = (props.ingredient.type !== 'bun')
    ? item.dotsActive
    : item.dotsHidden;

    function handleClick() {
      props.onIngredientClick(props.ingredient);
    };

  return(
    <>
      <div className={`${ item.block } pt-4 pb-4`}>
        <div className={`${item.subBlock} `}>
          <div className={ `${ dotsState }` }>
            <DragIcon type="primary" />
          </div>

          <div className={`${item.subBlock} ml-8`} onClick={ handleClick }>
            <img className={`${ item.image }`} src={ props.ingredient.image_mobile } alt={ props.ingredient.name } />
            <p className={`${item.name} text text_type_main-small ml-5`}>{ props.name }</p>
          </div>
        </div>
        
        <div className={ item.subBlock }>
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