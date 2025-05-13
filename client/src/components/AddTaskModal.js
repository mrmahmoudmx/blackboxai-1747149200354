import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function AddTaskModal({ isOpen, onClose, onAdd }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: '',
    assignee: '',
    deadline: new Date().toISOString().split('T')[0],
    priority: 'Medium',
    description: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.assignee) {
      setError(t('errors.required_fields'));
      return;
    }
    onAdd(formData);
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
            <h3 className="text-lg font-semibold text-black">{t('modals.add_task.title')}</h3>
          </div>

          {/* Modal Body */}
          <form onSubmit={handleSubmit} className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {/* Task Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('modals.add_task.title_field')} *
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

              {/* Assignee */}
              <div>
                <label htmlFor="assignee" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('modals.add_task.assignee')} *
                </label>
                <input
                  type="text"
                  id="assignee"
                  value={formData.assignee}
                  onChange={(e) => setFormData(prev => ({ ...prev, assignee: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                />
              </div>

              {/* Deadline */}
              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('modals.add_task.deadline')}
                </label>
                <input
                  type="date"
                  id="deadline"
                  value={formData.deadline}
                  onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              {/* Priority */}
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('modals.add_task.priority')}
                </label>
                <select
                  id="priority"
                  value={formData.priority}
                  onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="High">{t('common.priority.high')}</option>
                  <option value="Medium">{t('common.priority.medium')}</option>
                  <option value="Low">{t('common.priority.low')}</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('modals.add_task.description')}
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows="3"
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
                {t('modals.add_task.submit')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddTaskModal;
