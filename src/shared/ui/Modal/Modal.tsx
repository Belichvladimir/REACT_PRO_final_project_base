import React, { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  config: {
    title: string;
    description: string;
  } | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  config,
  onConfirm,
  onCancel,
}) => {

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onCancel]); 

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };
  if (!isOpen || !config) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.dialog} role="dialog" aria-modal="true">
        <button 
          className={styles.btnClose} 
          onClick={onCancel}
          aria-label="Закрыть"
        >
          &times;
        </button> 
        <h2 className={styles.title}>{config.title}</h2>
        <p className={styles.description}>{config.description}</p>
        <div className={styles.actions}>
          <button 
            className={styles.btnCancel} 
            onClick={onCancel}
          >
            Отмена
          </button>
          <button 
            className={styles.btnConfirm} 
            onClick={onConfirm}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
};