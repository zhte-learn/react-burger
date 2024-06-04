import React from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';

import { v4 as uuidv4 } from 'uuid';
import styles from './burger-constructor.module.css';
import ConstructorItem from './constructor-item/constructor-item';
import ConstructorItemInit from './constructor-item-init/constructor-item-init';
import PriceBlock from '../price-block/price-block';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { addBun, addIngredient, moveIngredient } from '../../services/constructor/actions';
import { getOrderDetails } from '../../services/order/actions';
import BurgerIngredient from '../../utils/ingredient-interface';

interface BurgerConstructorProps {
  onOrderClick: () => void,
}

function BurgerConstructor(props: BurgerConstructorProps) {
  const { bun, fillings } = useAppSelector(state => state.burgerConstructor);
  const dispatch = useAppDispatch();

  const [totalPrice, setTotalPrice] = React.useState(0);
  const [isDisabled, setIsDisabled] = React.useState(true);

  const getTotalPrice = React.useMemo(() => {
    let fillingsPrice = 0;
    
    if(fillings.length !== 0) {
      fillings.forEach(function(elem) {
        fillingsPrice += elem.price;
      })
    }
    
    if (bun) {
      return fillingsPrice + bun.price * 2;
    }
    return fillingsPrice;
  }, [bun, fillings]);

  React.useEffect(() => {
    setTotalPrice(getTotalPrice);
  }, [bun, fillings]);

  function getIngredientsIds(ingredientsList: BurgerIngredient[]) {
    return ingredientsList.map(item => item._id);
  }

  const makeOrder = React.useCallback(() => {
    const ingredientsList = [bun].concat(fillings);
    const ingredientsIds = (getIngredientsIds(ingredientsList));
    dispatch(getOrderDetails(ingredientsIds.concat(bun._id)));
  }, [bun, fillings]);

  function handleClick() {
    makeOrder();
    props.onOrderClick();
  };

  React.useEffect(() => {
    if(fillings.length > 0 && bun) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [bun, fillings]);

  function onDropHandler(item: BurgerIngredient) {
    if(item.type === 'bun') {
      dispatch(addBun(item));
    } else {
      dispatch(addIngredient(item));
    }
  }

  const [{ isHoverBunTop }, dropTargetBunTop] = useDrop({
    accept: 'bun',
    drop: (item: { ingredient: BurgerIngredient }) => onDropHandler(item.ingredient),
    collect: (monitor: DropTargetMonitor) => ({
      isHoverBunTop: monitor.isOver(),
    }),
  });

  const [{ isHoverBunBottom }, dropTargetBunBottom] = useDrop({
    accept: 'bun',
    drop: (item: { ingredient: BurgerIngredient }) => onDropHandler(item.ingredient),
    collect: (monitor: DropTargetMonitor) => ({
      isHoverBunBottom: monitor.isOver(),
    }),
  });

  const [{ isHoverFilling }, dropTargetFilling] = useDrop({
    accept: ['sauce', 'main'],
    drop: (item: { ingredient: BurgerIngredient }) => onDropHandler(item.ingredient),
    collect: (monitor: DropTargetMonitor) => ({
      isHoverFilling: monitor.isOver(),
    }),
  });

  const moveItem = React.useCallback((dragIndex: number, hoverIndex: number) => {
    dispatch(moveIngredient(dragIndex, hoverIndex));
  }, []);

  return(
    <section className={`${styles.container} pt-25 pl-4 pr-4 mb-15`}>
      <>
        {bun ? (
          <ConstructorItem 
            ref={dropTargetBunTop}
            item={bun} 
            position={'top'}
            index={0}
            isHover={isHoverBunTop}
          />
        ) : (
          <ConstructorItemInit 
            ref={dropTargetBunTop} 
            position={'top'}
            isHover={isHoverBunTop}
            text={'Выберите булку'}
          />
        )}

        {fillings.length == 0 ? (
          <ConstructorItemInit 
            ref={dropTargetFilling} 
            position={'middle'}
            isHover={isHoverFilling}
            text={'Выберите начинку'}
          />
        ) : (
          <ul ref={dropTargetFilling} className={styles.list}>
            {fillings.map((elem, index) => (
              <ConstructorItem 
                key={uuidv4()}
                item = {elem} 
                position={'middle'}
                index={index}
                isHover={isHoverFilling}
                moveItem={moveItem}
              /> 
            ))}
          </ul>
        )}

        {bun ? (
          <ConstructorItem 
            ref={dropTargetBunBottom} 
            item={bun} 
            position={'bottom'}
            index={0}
            isHover={isHoverBunBottom}
          />
          ) : (
          <ConstructorItemInit 
            ref={dropTargetBunBottom} 
            position={'bottom'}
            isHover={isHoverBunBottom}
            text={'Выберите булку'}
          />
        )}
      </>

      <div className={`${styles.order} mt-10 pr-8`}>
        <PriceBlock size="medium" price={totalPrice}/>
        <Button 
          htmlType="button" type="primary" size="large"
          disabled={isDisabled}
          onClick={handleClick}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

export default BurgerConstructor;
