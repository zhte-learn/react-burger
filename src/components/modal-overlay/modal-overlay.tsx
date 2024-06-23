import React from "react";
import overlayStyles from './modal-overlay.module.css';

interface ModalOverlayProps {
  onClose: () => void,
  children: React.ReactNode,
}

function ModalOverlay(props: ModalOverlayProps) {
  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = e.target as HTMLElement;
    if(target.dataset.overlay) {
      props.onClose();
    }
  }

  return (
    <div data-overlay="overlay" className={overlayStyles.overlay} onClick={handleOverlayClick}>
      {props.children}
    </div>    
  )
}

export default ModalOverlay;
