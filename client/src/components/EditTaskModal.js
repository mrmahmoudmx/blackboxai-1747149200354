import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function EditTaskModal({ isOpen, onClose, onEdit, initialData, mode = 'project' }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: '',
    assignee: '',
    deadline: new Date().toISOString().split('T')[0],
    priority: 'Medium',
    description: '',
    status: 'Active',
    progress: 0,
    ...initialData
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.name || initialData.title || '',
        assignee: initialData.assignee || '',
        deadline: initialData.endDate || initialData.deadline || new Date().toISOString().split('T')[0],
        priority: initialData.priority || 'Medium',
        description: initialData.description || initialData.specialty || '',
        status: initialData.status || 'Active',
        progress: initialData.progress || 0,
        ...initialData
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) {
      setError(t('errors.required_fields'));
      return;
    }
    onEdit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity z-40"></div>

      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full transform transition-all">
          {/* Modal Header */}
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-black">
              {mode === 'project' ? t('modals.edit_project.title') : t('modals.edit_subcontractor.title')}
            </h3>
          </div>

          {/* Modal Body */}
          <form onSubmit={handleSubmit} className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {/* Name/Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  {mode === 'project' ? t('modals.edit_project.name') : t('modals.edit_subcontractor.name')} *
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                />
              </div>

              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('common.status')}
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="Active">{t('common.status.active')}</option>
                  <option value="On Hold">{t('common.status.on_hold')}</option>
                  <option value="Completed">{t('common.status.completed')}</option>
                </select>
              </div>

              {/* Progress */}
              <div>
                <label htmlFor="progress" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('common.progress')}
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    id="progress"
                    value={formData.progress}
                    onChange={(e) => setFormData(prev => ({ ...prev, progress: parseInt(e.target.value) }))}
                    min="0"
                    max="100"
                    className="w-full"
                  />
                  <span className="text-sm text-gray-600">{formData.progress}%</span>
                </div>
              </div>

              {/* Description/Specialty */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  {mode === 'project' ? t('common.description') : t('modals.edit_subcontractor.specialty')}
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              {/* Deadline/End Date */}
              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                  {mode === 'project' ? t('common.end_date') : t('common.deadline')}
                </label>
                <input
                  type="date"
                  id="deadline"
                  value={formData.deadline}
                  onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                {t('common.cancel')}
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                {t('common.save')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditTaskModal;
