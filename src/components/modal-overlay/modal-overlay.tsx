import { FC } from 'react';
import overlayStyles from './modal-overlay.module.css';

interface ModalOverlayProps {
  onClose: () => void,
  children: React.ReactNode,
}

const ModalOverlay: FC<ModalOverlayProps> = ({ onClose, children}) => {
  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    const target = e.target as HTMLElement;
    if(target.dataset.overlay) {
      onClose();
    }
  }

  return (
    <div data-overlay="overlay" className={overlayStyles.overlay} onClick={handleOverlayClick}>
      {children}
    </div>    
  )
}

export default ModalOverlay;
