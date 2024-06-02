import React from 'react';
import itemStyles from './constructor-item.module.css';
import PriceBlock from '../../price-block/price-block';
import BurgerIngredient from "../../../utils/ingredient-interface";
import { LockIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector, useAppDispatch } from '../../../services/hooks';
import { removeIngredient } from '../../../services/constructor/actions';

interface IngredientItemProps {
  item: BurgerIngredient,
  name: string,
}

function ConstructorItem(props: IngredientItemProps) {
  const dispatch = useAppDispatch();

  function handleDelete() {
    dispatch(removeIngredient(props.item._id));
  }

  console.log("constructor item" + props.item.price)

  return(
    <>
      <div className={`${itemStyles.details} pt-4 pb-4 pr-8`}>
        <img className={`${itemStyles.image}`} src={props.item.image_mobile} alt={props.item.name} />
        <p className={`${itemStyles.name} text text_type_main-small ml-5`}>{props.name}</p>
      </div>

      <div className={itemStyles.controls}>
        <PriceBlock size={'small'} price={props.item.price}/>
        { 
          props.item.type !== 'bun'
          ? <DeleteIcon type="primary" onClick={handleDelete}/>
          : <LockIcon type="secondary" />
        }
      </div>
    </>
  )
}

export default ConstructorItem;