import React, { useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Portal from './Portal';

function BaseModal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  onSubmit, 
  submitText = 'Save',
  size = 'md' // sm, md, lg, xl
}) {
  const { t } = useTranslation();
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Focus trap management
  const handleTabKey = useCallback((e) => {
    if (!modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'Tab') {
      handleTabKey(e);
    }
  }, [onClose, handleTabKey]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(e);
    } catch (error) {
      console.error('Modal submission error:', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      
      // Focus the modal container
      if (modalRef.current) {
        modalRef.current.focus();
      }

      // Add event listener for keyboard navigation
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (isOpen) {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleKeyDown);
        
        // Return focus to previous element
        if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      }
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };

  const modalContent = (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Modal Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
        onClick={onClose}
        data-testid="modal-backdrop"
      />

      {/* Modal Positioning */}
      <div className="relative flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        {/* Modal Content */}
        <form 
          ref={modalRef}
          onSubmit={handleSubmit}
          className={`
            relative ${sizeClasses[size]} w-full transform overflow-hidden 
            rounded-lg bg-white text-left align-middle shadow-xl 
            transition-all duration-300 ease-out
            translate-y-0 opacity-100 scale-100
          `}
          onClick={e => e.stopPropagation()}
          data-testid="modal-form"
          tabIndex={-1}
        >
          {/* Modal Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 
              className="text-lg font-semibold text-gray-900" 
              id="modal-title"
            >
              {title}
            </h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-full p-1 transition-colors duration-200"
              onClick={onClose}
              aria-label={t('common.close')}
            >
              <span className="sr-only">{t('common.close')}</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <div className="px-6 py-4">
            {children}
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 border-t border-gray-100 flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 
                rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-black transition-colors duration-200"
              onClick={onClose}
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-black 
                rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 
                focus:ring-offset-2 focus:ring-black transition-colors duration-200"
            >
              {submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <Portal>
      {modalContent}
    </Portal>
  );
}

export default BaseModal;
