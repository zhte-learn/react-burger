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

function removeItemsByType(ingredientsList: BurgerIngredient[], type: string) {
  return ingredientsList.filter(item => !(item.type === type));
}

function getItemsByType(ingredientsList: BurgerIngredient[], type: string) {
  return ingredientsList.filter(item => item.type === type);
}

function BurgerConstructor(props: BurgerConstructorProps) {
  const { bun, fillings } = useAppSelector(state => state.burgerConstructor);
  const dispatch = useAppDispatch();
  //const bun = getItemsByType(props.ingredients, 'bun')[0];
  //const filling = removeItemsByType(props.ingredients, 'bun');

  function handleClick() {
    props.onMakeOrderClick();
  };

  return(
    <section className={`${constructorStyles.container} pt-25 pl-4 pr-4 mb-15`}>
      <>
        <div className={`${constructorStyles.itemContainer} ${constructorStyles.bunTop} pr-5 mr-4`}>
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

        { fillings.length === 0
          ? (
            <div className={`${constructorStyles.itemContainer} ${constructorStyles.filling} pr-5 mr-4`}>
              <p className={`${constructorStyles.text} text text_type_main-small pt-6 pb-6`}>Выберите начинку</p>
            </div>
          )
          : (
            <ul className={constructorStyles.list}>
              {fillings.map((elem) => (
                <>
                  <li key={uuidv4()} className={constructorStyles.listItem}>
                    <DragIcon type="primary" />
                    <div className={`${constructorStyles.itemContainer} ${constructorStyles.filling} pr-5 ml-1`}>
                      <ConstructorItem  
                        item = {elem} 
                        name={elem.name}
                      />
                    </div>
                  </li>
                </>
                
              ))}
            </ul>
          )
        }

        <div className={`${constructorStyles.itemContainer} ${constructorStyles.bunBottom} pr-5 mr-4`}>
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
        
          {/*<ConstructorItem 
            ingredient={bun} 
            name={`${bun.name} (верх)`}
            position={"top"}
          />
        </div>
        
      
        <ul className={constructorStyles.list}>
          {filling.map((ingredient) => (
            <li key={ingredient._id} className={`${ constructorStyles.listItem }`}>
              <DragIcon type="primary" />
              <ConstructorItem  
                ingredient = {ingredient} 
                name={ingredient.name}
                position={"middle"}
              />
            </li>
          ))}
        </ul>  

        <div className={`${constructorStyles.bunContainer} pr-5`}>
          <ConstructorItem 
            ingredient={bun} 
            name={`${bun.name} (низ)`} 
            position={"bottom"}
          />
          */}
        

        
      </>

      <div className={`${ constructorStyles.order } mt-10 pr-8`}>
        <PriceBlock size="medium" price={610}/>
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

/*
const dotsState = (props.ingredient.type !== 'bun')
    ? item.dotsActive
    : item.dotsHidden;
<div className={ `${ dotsState }` }>
            <DragIcon type="primary" />
          </div>*/