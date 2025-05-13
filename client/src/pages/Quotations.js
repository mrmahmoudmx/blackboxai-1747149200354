import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Quotations() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('pending');

  // Sample quotation data
  const quotations = [
    {
      id: 1,
      number: 'QT-2023-001',
      projectName: 'Office Tower Development',
      client: 'Global Enterprises Ltd.',
      date: '2023-11-20',
      amount: 4500000,
      validity: '30 days',
      status: 'Pending'
    },
    {
      id: 2,
      number: 'QT-2023-002',
      projectName: 'Residential Complex Phase 1',
      client: 'Urban Developers Inc.',
      date: '2023-11-18',
      amount: 2800000,
      validity: '45 days',
      status: 'Approved'
    },
    {
      id: 3,
      number: 'QT-2023-003',
      projectName: 'Shopping Mall Construction',
      client: 'Retail Solutions Co.',
      date: '2023-11-15',
      amount: 6700000,
      validity: '60 days',
      status: 'Rejected'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t('modules.quotations')}</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage and track project quotations
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Quotations</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">24</p>
          <p className="mt-1 text-sm text-green-600">+12% from last month</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Pending Approval</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">8</p>
          <p className="mt-1 text-sm text-yellow-600">5 require review</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Approved</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">12</p>
          <p className="mt-1 text-sm text-green-600">50% success rate</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Value</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">$14M</p>
          <p className="mt-1 text-sm text-blue-600">Average $1.2M per quote</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4 px-6 py-4">
            {['pending', 'approved', 'rejected', 'all'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 text-sm font-medium rounded-md capitalize ${
                  activeTab === tab
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Actions Bar */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex space-x-3">
              <input
                type="text"
                placeholder="Search quotations..."
                className="form-input rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <select className="form-select rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>All Clients</option>
                <option>Global Enterprises Ltd.</option>
                <option>Urban Developers Inc.</option>
                <option>Retail Solutions Co.</option>
              </select>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm">
                Export PDF
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                New Quotation
              </button>
            </div>
          </div>
        </div>

        {/* Quotations Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quotation #
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Validity
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {quotations.map((quote) => (
                <tr key={quote.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {quote.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {quote.projectName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {quote.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {quote.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${quote.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {quote.validity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(quote.status)}`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing 1 to {quotations.length} of {quotations.length} entries
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-blue-50 text-blue-600">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quotations;
