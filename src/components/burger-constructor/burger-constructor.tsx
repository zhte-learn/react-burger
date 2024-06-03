import React from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import styles from './burger-constructor.module.css';
import ConstructorItem from './constructor-item/constructor-item';
import PriceBlock from '../price-block/price-block';
import { Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { addBun, addIngredient } from '../../services/constructor/actions';
import BurgerIngredient from '../../utils/ingredient-interface';

interface BurgerConstructorProps {
  onMakeOrderClick: () => void
}

function BurgerConstructor(props: BurgerConstructorProps) {
  const { bun, fillings } = useAppSelector(state => state.burgerConstructor);
  const dispatch = useAppDispatch();

  const [totalPrice, setTotalPrice] = React.useState(0);

  const [{ isHoverBunTop }, dropTargetBunTop] = useDrop(useDropHandler(['bun'], 'isHoverBunTop'));
  const [{ isHoverBunBottom }, dropTargetBunBottom] = useDrop(useDropHandler(['bun'], 'isHoverBunBottom'));
  const [{ isHoverFilling }, dropTargetFilling] = useDrop(useDropHandler(['sauce', 'main'], 'isHoverFilling'));
  
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

  function useDropHandler(ingredientTypes: string[], collectProperty: string) {
    return () => ({
      accept: ingredientTypes,
      drop: (item: {ingredient: BurgerIngredient}) => {
        onDropHandler(item.ingredient);
      },
      collect: (monitor: DropTargetMonitor) => ({
        [collectProperty]: monitor.isOver(),
      })
    })
  };

  const bunHoverClass = (isHoverBunTop || isHoverBunBottom) ? styles.onHover : '';
  const fillingHoverClass = (isHoverFilling ? styles.onHover : '');

  return(
    <section className={`${styles.container} pt-25 pl-4 pr-4 mb-15`}>
      <>
          {bun 
            ? (
              <ConstructorItem 
                item={bun} 
                name={`${bun.name} (верх)`}
                index={0}
              />
              )
            : (
              <div 
                ref={dropTargetBunTop} 
                className={`${styles.itemContainer} 
                      ${styles.bunTop} pr-8 pl-6 mr-4
                      ${bunHoverClass}`}>
                <p className={`${styles.text} text text_type_main-small pt-6 pb-6`}>Выберите булку</p>
              </div>
              )
          }

        {fillings.length == 0
          ? (
            <div 
              ref={dropTargetFilling} 
              className={`${styles.itemContainer} 
                          ${styles.filling} pr-8 pl-6 mr-4
                          ${fillingHoverClass}`}>
              <p className={`${styles.text} text text_type_main-small pt-6 pb-6`}>Выберите начинку</p>
            </div>
          )
          : (
            <ul ref={dropTargetFilling} className= {`${styles.list} ${fillingHoverClass}`}>
              {fillings.map((elem, index) => (
                <li key={uuidv4()} className={styles.listItem}>
                  <DragIcon type="primary" />
                  <ConstructorItem 
                    item = {elem} 
                    name={elem.name}
                    index={index}
                  />
                </li>  
              ))}
            </ul>
          )
        }

          {bun 
            ? (
              <ConstructorItem 
                item={bun} 
                name={`${bun.name} (верх)`}
                index={0}
              />
              )
            : (
              <div 
                ref={dropTargetBunBottom} 
                className={`${styles.itemContainer} 
                      ${styles.bunBottom} pr-8 pl-6 mr-4
                      ${bunHoverClass}`}>
                <p className={`${styles.text} text text_type_main-small pt-6 pb-6`}>Выберите булку</p>
                </div>
              )
          }
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