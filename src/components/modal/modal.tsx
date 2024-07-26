import { useEffect } from "react";
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot: HTMLElement | null = document.getElementById("modal-root");

const KEY_NAME_ESC: string = 'Escape';

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ onClose, children }: ModalProps): JSX.Element => {
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent): void {
      if (event.code === KEY_NAME_ESC) {
        onClose();
      }
    }
    document.addEventListener('keydown', handleEscapeKey);
      return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [onClose]);

  //prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return ReactDOM.createPortal((
    <ModalOverlay onClose={onClose}>
      <div className={`${modalStyles.modal} pt-10 pb-10 pr-8 pl-8`}>
        <div className={modalStyles.closeIcon}>
          <CloseIcon type="primary" onClick={onClose}/>
        </div>
        {children} 
      </div> 
    </ModalOverlay>), 
    modalRoot!);
}

export default Modal;
