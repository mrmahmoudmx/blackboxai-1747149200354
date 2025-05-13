import React, { useState, useEffect } from 'react';
import BaseModal from './BaseModal';

function TenderModal({ isOpen, onClose, onSubmit, editTender = null }) {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    projectName: '',
    reference: '',
    client: '',
    submissionDate: '',
    value: '',
    status: 'Draft',
    description: ''
  });

  // Reset form when opening modal in new tender mode
  useEffect(() => {
    if (isOpen && !editTender) {
      setFormData({
        projectName: '',
        reference: '',
        client: '',
        submissionDate: '',
        value: '',
        status: 'Draft',
        description: ''
      });
      setError(null);
    }
  }, [isOpen, editTender]);

  useEffect(() => {
    if (editTender) {
      setFormData({
        projectName: editTender.projectName || '',
        reference: editTender.reference || '',
        client: editTender.client || '',
        submissionDate: editTender.submissionDate || '',
        value: editTender.value || '',
        status: editTender.status || 'Draft',
        description: editTender.description || ''
      });
      setError(null);
    }
  }, [editTender]);

  const validateForm = () => {
    if (!formData.projectName.trim()) {
      throw new Error('Project Name is required');
    }
    if (!formData.reference.trim()) {
      throw new Error('Reference is required');
    }
    if (!formData.client.trim()) {
      throw new Error('Client is required');
    }
    if (!formData.submissionDate) {
      throw new Error('Submission Date is required');
    }
    if (!formData.value.trim()) {
      throw new Error('Value is required');
    }
    
    // Validate value format (should be in $X.XM format)
    const valueRegex = /^\$\d+(\.\d+)?M$/;
    if (!valueRegex.test(formData.value)) {
      throw new Error('Value must be in format $X.XM (e.g., $5.2M)');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setError(null);
      validateForm();
      onSubmit(formData);
      onClose();
    } catch (err) {
      setError(err.message);
      console.error('Tender submission error:', err);
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={editTender ? 'Edit Tender' : 'New Tender'}
      onSubmit={handleSubmit}
      submitText={editTender ? 'Update' : 'Create'}
    >
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      <div className="space-y-4">
        <div>
          <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
            Project Name *
          </label>
          <input
            type="text"
            id="projectName"
            value={formData.projectName}
            onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="reference" className="block text-sm font-medium text-gray-700">
            Reference *
          </label>
          <input
            type="text"
            id="reference"
            value={formData.reference}
            onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="client" className="block text-sm font-medium text-gray-700">
            Client *
          </label>
          <input
            type="text"
            id="client"
            value={formData.client}
            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="submissionDate" className="block text-sm font-medium text-gray-700">
            Submission Date *
          </label>
          <input
            type="date"
            id="submissionDate"
            value={formData.submissionDate}
            onChange={(e) => setFormData({ ...formData, submissionDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="value" className="block text-sm font-medium text-gray-700">
            Value *
          </label>
          <input
            type="text"
            id="value"
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
            required
            placeholder="e.g., $5.2M"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
          >
            <option value="Draft">Draft</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
            placeholder="Enter tender description..."
          />
        </div>
      </div>
    </BaseModal>
  );
}

export default TenderModal;
