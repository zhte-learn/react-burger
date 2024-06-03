import React from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';

import { v4 as uuidv4 } from 'uuid';
import styles from './burger-constructor.module.css';
import ConstructorItem from './constructor-item/constructor-item';
import ConstructorItemInit from './constructor-item-init/constructor-item-init';
import PriceBlock from '../price-block/price-block';
import { Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { addBun, addIngredient, moveIngredient } from '../../services/constructor/actions';
import BurgerIngredient from '../../utils/ingredient-interface';

interface BurgerConstructorProps {
  onMakeOrderClick: () => void
}

function BurgerConstructor(props: BurgerConstructorProps) {
  const { bun, fillings } = useAppSelector(state => state.burgerConstructor);
  const dispatch = useAppDispatch();

  const [totalPrice, setTotalPrice] = React.useState(0);

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

  function handleClick() {
    props.onMakeOrderClick();
  };

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

  const bunHoverClass = (isHoverBunTop || isHoverBunBottom) ? styles.onHover : '';
  const fillingHoverClass = (isHoverFilling ? styles.onHover : '');

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
          onClick={handleClick}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

export default BurgerConstructor;


/*
  const [{ isHoverTop }, dropTargetBunTop] = useDrop(() => ({
    accept: 'bun',
    drop: (item: { id: string }) => {
      onDropHandler(item.id);
    },
    collect: monitor => ({
      isHoverTop: monitor.isOver(),
    }),
  }));

  const [{ isHoverFilling }, dropTargetFilling] = useDrop(() => ({
    accept: ['sauce', 'main'],
    drop: (item: { id: string }) => {
      onDropHandler(item.id);
    },
    collect: monitor => ({
      isHoverFilling: monitor.isOver(),
    }),
  }));

  const [{ isHoverBottom }, dropTargetBunBottom] = useDrop(() => ({
    accept: 'bun',
    drop: (item: { id: string }) => {
      onDropHandler(item.id);
    },
    collect: monitor => ({
      isHoverBottom: monitor.isOver(),
    }),
  }));
*/