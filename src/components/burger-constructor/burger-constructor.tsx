import React from 'react';
import constructorStyles from './burger-constructor.module.css';
import ConstructorItem from './constructor-item/constructor-item';
import PriceBlock from '../price-block/price-block';
import { Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from "../../utils/ingredient-interface";

interface BurgerConstructorProps {
  ingredients: BurgerIngredient[],
  onIngredientClick: (ingredient: BurgerIngredient) => void,
  onMakeOrderClick: () => void
}

function removeItemsByType(ingredientsList: BurgerIngredient[], type: string) {
  return ingredientsList.filter(item => !(item.type === type));
}

function getItemsByType(ingredientsList: BurgerIngredient[], type: string) {
  return ingredientsList.filter(item => item.type === type);
}

function BurgerConstructor(props: BurgerConstructorProps) {
  const bun = getItemsByType(props.ingredients, 'bun')[0];
  const filling = removeItemsByType(props.ingredients, 'bun');

  function handleClick() {
    props.onMakeOrderClick();
  };

  return(
    <section className={`${ constructorStyles.container } pt-25 pl-4 pr-4 mb-15`}>
      <>
        <div className={`${constructorStyles.bunContainer} pr-5`}>
          <ConstructorItem 
            ingredient={bun} 
            name={`${bun.name} (верх)`}
            onIngredientClick={props.onIngredientClick}
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
                onIngredientClick={props.onIngredientClick}
                position={"middle"}
              />
            </li>
          ))}
        </ul>  

        <div className={`${constructorStyles.bunContainer} pr-5`}>
          <ConstructorItem 
            ingredient={bun} 
            name={`${bun.name} (низ)`} 
            onIngredientClick={props.onIngredientClick}
            position={"bottom"}
          />
        </div>
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