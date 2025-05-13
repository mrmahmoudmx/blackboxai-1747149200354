import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SubcontractorModal from '../components/SubcontractorModal';

function Subcontractor() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubcontractor, setSelectedSubcontractor] = useState(null);
  const [subcontractors, setSubcontractors] = useState([
    {
      id: 1,
      name: 'Elite MEP Services',
      specialty: 'Mechanical & Electrical',
      activeContracts: 3,
      totalValue: 2500000,
      rating: 4.5,
      status: 'Active',
      email: 'contact@elitemep.com',
      phone: '+1 234 567 8900',
      address: '123 Business District, City',
      contracts: [
        {
          id: 'SC-001',
          project: 'Commercial Tower A1',
          scope: 'HVAC Installation',
          value: 850000,
          progress: 35,
          startDate: '2023-10-15',
          endDate: '2024-03-30'
        },
        {
          id: 'SC-002',
          project: 'Residential Complex B2',
          scope: 'Electrical Works',
          value: 650000,
          progress: 20,
          startDate: '2023-11-01',
          endDate: '2024-02-28'
        }
      ]
    },
    {
      id: 2,
      name: 'Premier Finishing Co.',
      specialty: 'Interior Finishing',
      activeContracts: 2,
      totalValue: 1800000,
      rating: 4.8,
      status: 'Active',
      email: 'info@premierfinishing.com',
      phone: '+1 234 567 8901',
      address: '456 Industrial Zone, City',
      contracts: [
        {
          id: 'SC-003',
          project: 'Commercial Tower A1',
          scope: 'Interior Finishing Works',
          value: 1200000,
          progress: 15,
          startDate: '2023-12-01',
          endDate: '2024-06-30'
        }
      ]
    }
  ]);

  const handleSubmit = (formData) => {
    if (selectedSubcontractor) {
      // Edit existing subcontractor
      const updatedSubcontractors = subcontractors.map(subcontractor => {
        if (subcontractor.id === selectedSubcontractor.id) {
          return {
            ...subcontractor,
            ...formData,
            id: subcontractor.id,
            contracts: subcontractor.contracts,
            activeContracts: subcontractor.activeContracts,
            totalValue: subcontractor.totalValue
          };
        }
        return subcontractor;
      });
      setSubcontractors(updatedSubcontractors);
    } else {
      // Add new subcontractor
      const newSubcontractor = {
        ...formData,
        id: subcontractors.length + 1,
        activeContracts: 0,
        totalValue: 0,
        contracts: []
      };
      setSubcontractors([...subcontractors, newSubcontractor]);
    }
    setIsModalOpen(false);
    setSelectedSubcontractor(null);
  };

  const handleEditClick = (subcontractor) => {
    setSelectedSubcontractor(subcontractor);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedSubcontractor(null);
    setIsModalOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'On Hold':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {t('modules.subcontractor')}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage subcontractor relationships and contracts
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Active Subcontractors</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">12</p>
          <p className="mt-1 text-sm text-green-600">+2 this month</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Contracts</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">28</p>
          <p className="mt-1 text-sm text-blue-600">$15.2M total value</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Avg. Performance</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">4.3</p>
          <p className="mt-1 text-sm text-yellow-600">Out of 5.0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Pending Payments</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">$2.8M</p>
          <p className="mt-1 text-sm text-red-600">8 invoices pending</p>
        </div>
      </div>

      {/* Subcontractor Cards */}
      {subcontractors.map((subcontractor) => (
        <div key={subcontractor.id} className="bg-white rounded-lg shadow mb-6">
          {/* Subcontractor Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {subcontractor.name}
                </h2>
                <p className="text-sm text-gray-600">{subcontractor.specialty}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className={`text-lg font-bold ${getRatingColor(subcontractor.rating)}`}>
                    {subcontractor.rating}
                  </div>
                  <div className="text-xs text-gray-500">Rating</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(subcontractor.status)}`}>
                  {subcontractor.status}
                </span>
              </div>
            </div>
          </div>

          {/* Subcontractor Details */}
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Contact Info</h4>
                <p className="mt-1 text-sm text-gray-900">{subcontractor.email}</p>
                <p className="text-sm text-gray-900">{subcontractor.phone}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Active Contracts</h4>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {subcontractor.activeContracts}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Total Contract Value</h4>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  ${subcontractor.totalValue.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Active Contracts */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Active Contracts</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contract ID
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Project
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Scope
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Value
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Progress
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Timeline
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {subcontractor.contracts.map((contract) => (
                      <tr key={contract.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {contract.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {contract.project}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {contract.scope}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${contract.value.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{ width: `${contract.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-500">
                              {contract.progress}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {contract.startDate} - {contract.endDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => handleEditClick(subcontractor)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
              >
                Edit Subcontractor
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                Payment History
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                New Contract
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Add Subcontractor Button */}
      <div className="mt-6">
        <button 
          onClick={handleAddClick}
          className="w-full px-4 py-3 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Subcontractor
        </button>
      </div>

      {/* Subcontractor Modal */}
      <SubcontractorModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSubcontractor(null);
        }}
        onSubmit={handleSubmit}
        initialData={selectedSubcontractor}
      />
    </div>
  );
}

export default Subcontractor;
