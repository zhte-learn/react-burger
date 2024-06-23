import React from "react";
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import BurgerIngredient from "../../utils/ingredient-interface";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("modal-root");

const KEY_NAME_ESC = 'Escape';

interface ModalProps {
  onClose: () => void;
  ingredient?: BurgerIngredient,
  title?: string,
  children: React.ReactNode
}

function Modal(props: ModalProps) {
  React.useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === KEY_NAME_ESC) {
        props.onClose();
      }
    }
    document.addEventListener('keydown', handleEscapeKey);
      return () => document.removeEventListener('keydown', handleEscapeKey);
    }, [props.onClose]);

  return ReactDOM.createPortal((
    <ModalOverlay onClose={props.onClose}>
      <div className={`${modalStyles.modal} pt-10 pb-10 pr-8 pl-8`}>
        <div className={modalStyles.closeIcon}>
          <CloseIcon type="primary" onClick={props.onClose}/>
        </div>
        {props.children} 
      </div> 
    </ModalOverlay>), 
    modalRoot!);
}

export default Modal;
