import React from "react";
import Modal from "../modal/modal";
import overlayStyles from './modal-overlay.module.css';
import BurgerIngredient from "../../utils/ingredient-interface";

interface ModalOverlayProps {
  onClose: () => void,
  children: React.ReactNode,
}

function ModalOverlay(props: ModalOverlayProps) {
  return (
    <div className={ overlayStyles.overlay } onClick={ props.onClose }>
      {props.children}
    </div>    
    
  )
}

export default ModalOverlay;