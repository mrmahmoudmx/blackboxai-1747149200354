import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import BaseModal from './BaseModal';

function ProjectModal({ isOpen, onClose, onSubmit, initialData = null }) {
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    budget: '',
    status: 'Not Started',
    progress: 0,
    description: ''
  });

  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      location: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      budget: '',
      status: 'Not Started',
      progress: 0,
      description: ''
    });
    setError('');
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          name: initialData.name || '',
          location: initialData.location || '',
          startDate: initialData.startDate || new Date().toISOString().split('T')[0],
          endDate: initialData.endDate || '',
          budget: initialData.budget || '',
          status: initialData.status || 'Not Started',
          progress: initialData.progress || 0,
          description: initialData.description || ''
        });
      } else {
        resetForm();
      }
    }
  }, [initialData, isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.location) {
      setError(t('errors.required_fields'));
      return;
    }
    
    // Convert budget to number and ensure all required fields are properly formatted
    const processedData = {
      ...formData,
      budget: formData.budget ? parseFloat(formData.budget) : 0,
      progress: parseInt(formData.progress),
      startDate: formData.startDate || new Date().toISOString().split('T')[0],
      endDate: formData.endDate || '',
      status: formData.status || 'Not Started'
    };
    
    onSubmit(processedData);
    resetForm();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title={initialData ? t('modals.edit_project') : t('modals.add_project')}
      onSubmit={handleSubmit}
      submitText={initialData ? t('common.save') : t('common.create')}
      size="lg"
    >
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {/* Project Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            {t('projects.name')} *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => {
              setError('');
              setFormData(prev => ({ ...prev, name: e.target.value }));
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            {t('projects.location')} *
          </label>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={(e) => {
              setError('');
              setFormData(prev => ({ ...prev, location: e.target.value }));
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            required
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              {t('projects.start_date')}
            </label>
            <input
              type="date"
              id="startDate"
              value={formData.startDate}
              onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              {t('projects.end_date')}
            </label>
            <input
              type="date"
              id="endDate"
              value={formData.endDate}
              onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
        </div>

        {/* Budget */}
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
            {t('projects.budget')}
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
            <input
              type="number"
              id="budget"
              value={formData.budget}
              onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
              className="w-full pl-8 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              min="0"
              step="1000"
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            {t('projects.status')}
          </label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="Not Started">{t('status.not_started')}</option>
            <option value="On Track">{t('status.on_track')}</option>
            <option value="Delayed">{t('status.delayed')}</option>
            <option value="Completed">{t('status.completed')}</option>
          </select>
        </div>

        {/* Progress */}
        <div>
          <label htmlFor="progress" className="block text-sm font-medium text-gray-700 mb-1">
            {t('projects.progress')}
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              id="progress"
              value={formData.progress}
              onChange={(e) => setFormData(prev => ({ ...prev, progress: parseInt(e.target.value) }))}
              className="flex-1"
              min="0"
              max="100"
              step="5"
            />
            <span className="text-sm text-gray-600 w-12">{formData.progress}%</span>
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            {t('projects.description')}
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
    </BaseModal>
  );
}

export default ProjectModal;
