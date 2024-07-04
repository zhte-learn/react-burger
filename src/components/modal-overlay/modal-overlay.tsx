import overlayStyles from './modal-overlay.module.css';

type ModalOverlayProps = {
  onClose: () => void;
  children: React.ReactNode;
}

const ModalOverlay = ({ onClose, children }: ModalOverlayProps): JSX.Element => {
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
