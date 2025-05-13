import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ModalProvider, useModal } from '../contexts/ModalContext';

// Test component that uses the modal context
function TestComponent() {
  const { openModal, closeModal, closeAllModals } = useModal();
  
  return (
    <div>
      <button onClick={() => openModal(<div>Modal 1</div>)}>Open Modal 1</button>
      <button onClick={() => openModal(<div>Modal 2</div>)}>Open Modal 2</button>
      <button onClick={closeModal}>Close Modal</button>
      <button onClick={closeAllModals}>Close All Modals</button>
    </div>
  );
}

describe('ModalContext', () => {
  test('throws error when useModal is used outside provider', () => {
    // Suppress console.error for this test as we expect an error
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => render(<TestComponent />)).toThrow('useModal must be used within a ModalProvider');
    
    consoleSpy.mockRestore();
  });

  test('opens modal when openModal is called', () => {
    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );

    fireEvent.click(screen.getByText('Open Modal 1'));
    expect(screen.getByText('Modal 1')).toBeInTheDocument();
  });

  test('closes last modal when closeModal is called', () => {
    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );

    // Open two modals
    fireEvent.click(screen.getByText('Open Modal 1'));
    fireEvent.click(screen.getByText('Open Modal 2'));

    // Close the last modal
    fireEvent.click(screen.getByText('Close Modal'));

    // Modal 2 should be gone, but Modal 1 should still be there
    expect(screen.queryByText('Modal 2')).not.toBeInTheDocument();
    expect(screen.getByText('Modal 1')).toBeInTheDocument();
  });

  test('closes all modals when closeAllModals is called', () => {
    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );

    // Open two modals
    fireEvent.click(screen.getByText('Open Modal 1'));
    fireEvent.click(screen.getByText('Open Modal 2'));

    // Close all modals
    fireEvent.click(screen.getByText('Close All Modals'));

    // Both modals should be gone
    expect(screen.queryByText('Modal 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal 2')).not.toBeInTheDocument();
  });
});
