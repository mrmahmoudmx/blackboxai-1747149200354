import React, { createContext, useContext, useState } from 'react';
import Portal from '../components/Portal';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modalStack, setModalStack] = useState([]);

  const openModal = (modalComponent) => {
    setModalStack((prev) => [...prev, modalComponent]);
  };

  const closeModal = () => {
    setModalStack((prev) => prev.slice(0, -1));
  };

  const closeAllModals = () => {
    setModalStack([]);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, closeAllModals }}>
      {children}
      <Portal>
        {modalStack.map((Modal, index) => (
          <React.Fragment key={index}>{Modal}</React.Fragment>
        ))}
      </Portal>
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
