import React from "react";
import { useDrag } from "react-dnd";

import itemStyles from './ingredient-item.module.css';
import PriceBlock from "../../price-block/price-block";
import BurgerIngredient from "../../../utils/ingredient-interface";
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import { useAppSelector, useAppDispatch } from '../../../services/hooks';
import { selectIngredient } from "../../../services/selected-ingredient/actions";
import { addBun, addIngredient } from '../../../services/constructor/actions';

interface IngredientItemProps {
  ingredient: BurgerIngredient,
  onIngredientClick: () => void
}

function IngredientItem(props: IngredientItemProps) {
  const { bun, fillings } = useAppSelector(state => state.burgerConstructor);
  const dispatch = useAppDispatch();

  const getCounter = React.useMemo(() => {
    if(props.ingredient.type === 'bun' && bun && bun._id === props.ingredient._id) {
      return 2;
    } else if(props.ingredient.type !== 'bun') {
      return fillings.filter((item) => item._id === props.ingredient._id).length;
    } else {
      return 0;
    }
  }, [bun, fillings, props.ingredient]);

  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    setCounter(getCounter);
  }, [bun, fillings]);
  
  function handleClick() {
    dispatch(selectIngredient(props.ingredient));
    //
    //temporary before DND
    // if(props.ingredient.type === 'bun') {
    //   dispatch(addBun(props.ingredient));
    // } else {
    //   dispatch(addIngredient(props.ingredient));
    // }
    //
    props.onIngredientClick();
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: props.ingredient.type,
    item: { ingredient: props.ingredient },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  });

  const opacity = isDragging ? 0.4 : 1;
  
  return (
    <>
      <li 
        ref={dragRef}
        className={`${ itemStyles.item } mb-8`}
        onClick={ handleClick }
        style={{ opacity }}
      >
        <img src={ props.ingredient.image } alt={ props.ingredient.name } />
        <PriceBlock size="small" price={props.ingredient.price} />
        <p className={`${ itemStyles.name } pt-1 text text_type_main-small`}>
          {props.ingredient.name}
        </p>
        {
        counter > 0 
          &&
          <Counter count={counter} size="default" extraClass="m-1" />
        }
      </li>    
    </>
  )
}

export default IngredientItem;