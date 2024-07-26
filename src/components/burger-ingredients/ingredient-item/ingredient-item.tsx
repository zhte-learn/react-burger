import { useMemo, useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';

import itemStyles from './ingredient-item.module.css';
import PriceBlock from '../../price-block/price-block';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { TBurgerIngredient } from '../../../utils/custom-types';
import { useAppSelector } from '../../../services/hooks';

type IngredientItemProps = {
  ingredient: TBurgerIngredient,
}

const IngredientItem = ({ ingredient }: IngredientItemProps): JSX.Element => {
  const ingredientId: string = ingredient._id;
  const { bun, fillings } = useAppSelector(state => state.burgerConstructor);
  const location = useLocation();

  const getCounter: number = useMemo<number>(() => {
    if(ingredient.type === 'bun' && bun && bun._id === ingredient._id) {
      return 2;
    } else if(ingredient.type !== 'bun') {
      return fillings.filter((item) => item._id === ingredient._id).length;
    } else {
      return 0;
    }
  }, [bun, fillings, ingredient]);

  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    setCounter(getCounter);
  }, [bun, fillings]);

  const [{ isDragging }, dragRef] = useDrag({
    type: ingredient.type,
    item: {ingredient: ingredient},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  });

  const opacity: number = isDragging ? 0.4 : 1;

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

        <img src={ingredient.image} alt={ingredient.name} />
        
        <PriceBlock size="small" price={ingredient.price} />
        <p className={`${itemStyles.name} pt-1 text text_type_main-small`}>
          {ingredient.name}
        </p>

        {counter > 0 && <Counter count={counter} size="default" extraClass="m-1" />}
      </Link>    
    </>
  )
}

export default IngredientItem;
