import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProjectModal from '../components/ProjectModal';

// Mock Portal and BaseModal since we're testing ProjectModal's logic
jest.mock('../components/Portal', () => {
  return {
    __esModule: true,
    default: ({ children }) => children,
  };
});

// Mock react-i18next useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const translations = {
        'errors.required_fields': 'Please fill in all required fields',
        'common.cancel': 'Cancel',
        'common.save': 'Save',
        'common.create': 'Create',
        'modals.edit_project': 'Edit Project',
        'modals.add_project': 'Add Project',
        'projects.name': 'Project Name',
        'projects.location': 'Location',
        'projects.start_date': 'Start Date',
        'projects.end_date': 'End Date',
        'projects.budget': 'Budget',
        'projects.status': 'Status',
        'projects.progress': 'Progress',
        'projects.description': 'Description',
        'status.not_started': 'Not Started',
        'status.on_track': 'On Track',
        'status.delayed': 'Delayed',
        'status.completed': 'Completed',
      };
      return translations[key] || key;
    },
  }),
}));

describe('ProjectModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnSubmit.mockClear();
  });

  const renderProjectModal = (props = {}) => {
    return render(
      <ProjectModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        {...props}
      />
    );
  };

  test('renders with default values for new project', () => {
    renderProjectModal();
    
    expect(screen.getByText('Add Project')).toBeInTheDocument();
    expect(screen.getByLabelText(/project name/i)).toHaveValue('');
    expect(screen.getByLabelText(/location/i)).toHaveValue('');
    expect(screen.getByLabelText(/status/i)).toHaveValue('Not Started');
    expect(screen.getByLabelText(/progress/i)).toHaveValue('0');
  });

  test('renders with initial data for editing project', () => {
    const initialData = {
      name: 'Test Project',
      location: 'Test Location',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      budget: '100000',
      status: 'On Track',
      progress: 50,
      description: 'Test Description'
    };

    renderProjectModal({ initialData });
    
    expect(screen.getByText('Edit Project')).toBeInTheDocument();
    expect(screen.getByLabelText(/project name/i)).toHaveValue(initialData.name);
    expect(screen.getByLabelText(/location/i)).toHaveValue(initialData.location);
    expect(screen.getByLabelText(/status/i)).toHaveValue(initialData.status);
    expect(screen.getByLabelText(/progress/i)).toHaveValue('50');
  });

  test('shows error when submitting without required fields', async () => {
    renderProjectModal();
    
    const submitButton = screen.getByText('Create');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Please fill in all required fields')).toBeInTheDocument();
    });
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('submits form with valid data', async () => {
    renderProjectModal();
    
    // Fill required fields
    fireEvent.change(screen.getByLabelText(/project name/i), {
      target: { value: 'New Project' }
    });
    fireEvent.change(screen.getByLabelText(/location/i), {
      target: { value: 'New Location' }
    });
    
    // Submit form
    const submitButton = screen.getByText('Create');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({
        name: 'New Project',
        location: 'New Location',
        status: 'Not Started',
        progress: 0
      }));
    });
  });

  test('converts budget to number on submit', async () => {
    renderProjectModal();
    
    // Fill required fields
    fireEvent.change(screen.getByLabelText(/project name/i), {
      target: { value: 'New Project' }
    });
    fireEvent.change(screen.getByLabelText(/location/i), {
      target: { value: 'New Location' }
    });
    fireEvent.change(screen.getByLabelText(/budget/i), {
      target: { value: '1000' }
    });
    
    // Submit form
    const submitButton = screen.getByText('Create');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({
        budget: 1000
      }));
    });
  });

  test('resets form on close', () => {
    renderProjectModal();
    
    // Fill some fields
    fireEvent.change(screen.getByLabelText(/project name/i), {
      target: { value: 'Test Project' }
    });
    
    // Close modal
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    
    expect(mockOnClose).toHaveBeenCalled();
    
    // Reopen modal
    renderProjectModal();
    
    // Check if fields are reset
    expect(screen.getByLabelText(/project name/i)).toHaveValue('');
  });

  test('updates progress with slider', () => {
    renderProjectModal();
    
    const progressSlider = screen.getByLabelText(/progress/i);
    fireEvent.change(progressSlider, { target: { value: '75' } });
    
    expect(screen.getByText('75%')).toBeInTheDocument();
  });
});
