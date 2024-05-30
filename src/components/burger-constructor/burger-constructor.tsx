import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import constructorStyles from './burger-constructor.module.css';
import ConstructorItem from './constructor-item/constructor-item';
import PriceBlock from '../price-block/price-block';
import { Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from "../../utils/ingredient-interface";

import { useAppSelector, useAppDispatch } from '../../services/hooks';

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

  return(
    <section className={`${constructorStyles.container} pt-25 pl-4 pr-4 mb-15`}>
      <>
        <div className={`${constructorStyles.itemContainer} ${constructorStyles.bunTop} pr-8 pl-6 mr-4`}>
          { bun 
            ? (
              <ConstructorItem 
                item={bun} 
                name={`${bun.name} (верх)`}
              />
              )
            : (
                <p className={`${constructorStyles.text} text text_type_main-small pt-6 pb-6`}>Выберите булку</p>
              )
          }
        </div>

        { fillings.length == 0
          ? (
            <div className={`${constructorStyles.itemContainer} ${constructorStyles.filling} pr-8 pl-6 mr-4`}>
              <p className={`${constructorStyles.text} text text_type_main-small pt-6 pb-6`}>Выберите начинку</p>
            </div>
          )
          : (
            <ul className={constructorStyles.list}>
              {fillings.map((elem) => (
                <li key={uuidv4()} className={constructorStyles.listItem}>
                  <DragIcon type="primary" />
                  <div className={`${constructorStyles.itemContainer} ${constructorStyles.filling} pr-8 pl-6 ml-1`}>
                    <ConstructorItem 
                      item = {elem} 
                      name={elem.name}
                    />
                  </div>
                </li>  
              ))}
            </ul>
          )
        }

        <div className={`${constructorStyles.itemContainer} ${constructorStyles.bunBottom} pr-8 pl-6 mr-4`}>
          { bun 
            ? (
              <ConstructorItem 
                item={bun} 
                name={`${bun.name} (верх)`}
              />
              )
            : (
                <p className={`${constructorStyles.text} text text_type_main-small pt-6 pb-6`}>Выберите булку</p>
              )
          }
        </div>
      </>

      <div className={`${ constructorStyles.order } mt-10 pr-8`}>
        <PriceBlock size="medium" price={totalPrice}/>
        <Button 
          htmlType="button" type="primary" size="large"
          onClick={ handleClick }
        >
          Оформить заказ
        </Button>
      </div>

    </section>
  )
}

export default BurgerConstructor;
