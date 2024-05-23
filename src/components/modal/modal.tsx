import React from "react";
import modalStyles from './modal.module.css';
import BurgerIngredient from "../../utils/ingredient-interface";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const KEY_NAME_ESC = 'Escape';

interface ModalProps {
  onClose: () => void;
  ingredient: BurgerIngredient | null,
  orderNumber: string,
  title: string,
  children: React.ReactNode
}

function Modal(props: ModalProps) {
  const headerContainerStyle = 
    props.ingredient 
    ? `text text_type_main-large`
    : `${ modalStyles.headerHidden }`;

  React.useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === KEY_NAME_ESC) {
        props.onClose();
      }
    }
  
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [props.onClose]);

  return(
    <div className={`${modalStyles.modal} pt-10 pb-10`}>
      <div className={ modalStyles.headerContainer }>
        <h2 className="text text_type_main-large">{ props.title }</h2>
        <CloseIcon type="primary" onClick={ props.onClose }/>
      </div>
      {props.children} 
    </div>
  )
}

export default Modal;