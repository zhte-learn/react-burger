import React from "react";
import modalStyles from './modal.module.css';
import IngredientDetails from "../ingredient-details/ingredient-details";
import BurgerIngredient from "../../utils/ingredient-interface";
import successSign from "../../images/success.png";

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface ModalProps {
  onClose: () => void;
  ingredient: BurgerIngredient | null,
  orderNumber: string,
}

function Modal(props: ModalProps) {
  const headerContainerStyle = 
    props.ingredient 
    ? `text text_type_main-large`
    : `${ modalStyles.headerHidden }`;

  return(
    <div className={ modalStyles.modal }>
      <div className="pt-10 pb-10">
      <div className={`${ modalStyles.headerContainer } pr-8 pl-8`}>
        <h2 className={ headerContainerStyle }>
          Детали ингредиента
        </h2>
        <CloseIcon type="primary" onClick={ props.onClose }/>
      </div>

      {
        props.ingredient 
        ?
        <>
          <img 
            className={ modalStyles.image }
            src={ props.ingredient?.image_large } 
            alt={ props.ingredient?.name } 
          />

          <IngredientDetails 
            name={props.ingredient?.name}
            fat={props.ingredient?.fat}
            carbohydrates={props.ingredient?.carbohydrates}
            calories={props.ingredient?.calories}
            proteins={props.ingredient?.proteins}
          />
        </>
        :
        <div className={ modalStyles.orderContainer }>
          <p className={`${ modalStyles.orderNumber } text text_type_digits-large`}>
            { props.orderNumber }
          </p>
          <p className="text text_type_main-medium">идентификатор заказа</p>
          <img className="mt-15" src={ successSign } alt={ "Подтверждение заказа" } />
          <p className="mt-15 text text_type_main-small">Ваш заказ начали готовить заказа</p>
          <p className="mt-2 text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной станции</p>

        </div>
        
      }
      
      </div>
    </div>
  )
}

export default Modal;