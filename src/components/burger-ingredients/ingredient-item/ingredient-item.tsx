import React from "react";
import { useDrag } from "react-dnd";
import { Link, useLocation } from 'react-router-dom';

import itemStyles from './ingredient-item.module.css';
import PriceBlock from "../../price-block/price-block";
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredient } from '../../../utils/custom-types';
import { useAppSelector } from '../../../services/hooks';

interface IngredientItemProps {
  ingredient: BurgerIngredient,
}

function IngredientItem(props: IngredientItemProps) {
  const ingredientId = props.ingredient._id;
  const { bun, fillings } = useAppSelector(state => state.burgerConstructor);
  const location = useLocation();

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

  const [{ isDragging }, dragRef] = useDrag({
    type: props.ingredient.type,
    item: {ingredient: props.ingredient},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <>
      <Link 
        key={ingredientId}
        // Тут мы формируем динамический путь для нашего ингредиента
        to={`/ingredients/${ingredientId}`}
        // а также сохраняем в свойство background роут,
        // на котором была открыта наша модалка
        state={{ background: location }}
        ref={dragRef}
        className={`${itemStyles.item} mb-8`}
        style={{opacity}}
      >

        <img src={props.ingredient.image} alt={props.ingredient.name} />
        
        <PriceBlock size="small" price={props.ingredient.price} />
        <p className={`${itemStyles.name} pt-1 text text_type_main-small`}>
          {props.ingredient.name}
        </p>

        {counter > 0 && <Counter count={counter} size="default" extraClass="m-1" />}
      </Link>    
    </>
  )
}

export default IngredientItem;
