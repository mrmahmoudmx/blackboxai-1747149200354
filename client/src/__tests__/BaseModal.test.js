import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BaseModal from '../components/BaseModal';

// Mock Portal component since it uses ReactDOM.createPortal
jest.mock('../components/Portal', () => {
  return {
    __esModule: true,
    default: ({ children }) => children,
  };
});

describe('BaseModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn(e => e.preventDefault());

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnSubmit.mockClear();
  });

  test('renders nothing when isOpen is false', () => {
    render(
      <BaseModal
        isOpen={false}
        onClose={mockOnClose}
        title="Test Modal"
        onSubmit={mockOnSubmit}
      >
        <div>Modal Content</div>
      </BaseModal>
    );

    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  test('renders modal content when isOpen is true', () => {
    render(
      <BaseModal
        isOpen={true}
        onClose={mockOnClose}
        title="Test Modal"
        onSubmit={mockOnSubmit}
      >
        <div>Modal Content</div>
      </BaseModal>
    );

    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  test('calls onClose when clicking the close button', () => {
    render(
      <BaseModal
        isOpen={true}
        onClose={mockOnClose}
        title="Test Modal"
        onSubmit={mockOnSubmit}
      >
        <div>Modal Content</div>
      </BaseModal>
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when clicking the backdrop', () => {
    render(
      <BaseModal
        isOpen={true}
        onClose={mockOnClose}
        title="Test Modal"
        onSubmit={mockOnSubmit}
      >
        <div>Modal Content</div>
      </BaseModal>
    );

    const backdrop = screen.getByTestId('modal-backdrop');
    fireEvent.click(backdrop);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls onSubmit when form is submitted', () => {
    render(
      <BaseModal
        isOpen={true}
        onClose={mockOnClose}
        title="Test Modal"
        onSubmit={mockOnSubmit}
      >
        <div>Modal Content</div>
      </BaseModal>
    );

    const form = screen.getByRole('form');
    fireEvent.submit(form);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when escape key is pressed', () => {
    const { container } = render(
      <BaseModal
        isOpen={true}
        onClose={mockOnClose}
        title="Test Modal"
        onSubmit={mockOnSubmit}
      >
        <div>Modal Content</div>
      </BaseModal>
    );

    const modalContainer = container.querySelector('[tabindex="-1"]');
    modalContainer.focus();
    fireEvent.keyDown(modalContainer, { key: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('renders with different sizes', () => {
    const { rerender } = render(
      <BaseModal
        isOpen={true}
        onClose={mockOnClose}
        title="Test Modal"
        onSubmit={mockOnSubmit}
        size="sm"
      >
        <div>Modal Content</div>
      </BaseModal>
    );

    expect(screen.getByRole('form')).toHaveClass('max-w-sm');

    rerender(
      <BaseModal
        isOpen={true}
        onClose={mockOnClose}
        title="Test Modal"
        onSubmit={mockOnSubmit}
        size="lg"
      >
        <div>Modal Content</div>
      </BaseModal>
    );

    expect(screen.getByRole('form')).toHaveClass('max-w-lg');
  });
});
