import React from "react";
import overlayStyles from './modal-overlay.module.css';

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
