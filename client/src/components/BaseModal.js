import React, { useEffect, useCallback } from 'react';
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

  const modalRef = React.useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus the modal container when it opens
      if (modalRef.current) {
        modalRef.current.focus();
      }
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

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
          role="form"
          onSubmit={onSubmit} 
          className={`relative ${sizeClasses[size]} w-full transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all z-50`}
          onClick={e => e.stopPropagation()}
          data-testid="modal-form"
        >
          {/* Modal Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900" id="modal-title">
              {title}
            </h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-full p-1"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            {children}
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 border-t border-gray-100 flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              onClick={onClose}
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
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
      <div 
        ref={modalRef}
        className="fixed inset-0 z-50"
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        {modalContent}
      </div>
    </Portal>
  );
}

export default BaseModal;
