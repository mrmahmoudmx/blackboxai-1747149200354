import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import BaseModal from './BaseModal';

function SubcontractorModal({ isOpen, onClose, onSubmit, initialData = null }) {
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    status: 'Active',
    rating: 0,
    email: '',
    phone: '',
    address: '',
    description: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        specialty: initialData.specialty || '',
        status: initialData.status || 'Active',
        rating: initialData.rating || 0,
        email: initialData.email || '',
        phone: initialData.phone || '',
        address: initialData.address || '',
        description: initialData.description || ''
      });
    } else {
      // Reset form when opening for new subcontractor
      setFormData({
        name: '',
        specialty: '',
        status: 'Active',
        rating: 0,
        email: '',
        phone: '',
        address: '',
        description: ''
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.specialty) {
      setError(t('errors.required_fields'));
      return;
    }

    const processedData = {
      ...formData,
      rating: parseFloat(formData.rating)
    };

    onSubmit(processedData);
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? t('modals.edit_subcontractor') : t('modals.add_subcontractor')}
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
        {/* Company Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            {t('subcontractors.company_name')} *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            required
          />
        </div>

        {/* Specialty */}
        <div>
          <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
            {t('subcontractors.specialty')} *
          </label>
          <input
            type="text"
            id="specialty"
            value={formData.specialty}
            onChange={(e) => setFormData(prev => ({ ...prev, specialty: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            required
          />
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {t('common.email')}
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              {t('common.phone')}
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            {t('common.address')}
          </label>
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
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
            <option value="Active">{t('status.active')}</option>
            <option value="On Hold">{t('status.on_hold')}</option>
            <option value="Inactive">{t('status.inactive')}</option>
          </select>
        </div>

        {/* Rating */}
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
            {t('subcontractors.rating')}
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              id="rating"
              value={formData.rating}
              onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
              className="flex-1"
              min="0"
              max="5"
              step="0.1"
            />
            <span className="text-sm text-gray-600 w-12">{formData.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            {t('common.description')}
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

export default SubcontractorModal;
