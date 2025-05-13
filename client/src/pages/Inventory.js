import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Inventory() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('materials');

  // Sample inventory data
  const materials = [
    {
      id: 1,
      code: 'MAT-001',
      name: 'Steel Reinforcement Bars',
      category: 'Construction Materials',
      unit: 'Tons',
      inStock: 250,
      minLevel: 100,
      maxLevel: 500,
      value: 187500,
      location: 'Main Warehouse',
      lastUpdated: '2023-11-20',
      status: 'Adequate'
    },
    {
      id: 2,
      code: 'MAT-002',
      name: 'Portland Cement',
      category: 'Construction Materials',
      unit: 'Bags',
      inStock: 1200,
      minLevel: 1000,
      maxLevel: 3000,
      value: 12000,
      location: 'Site Storage A1',
      lastUpdated: '2023-11-19',
      status: 'Low Stock'
    }
  ];

  const transactions = [
    {
      id: 'TRX-001',
      date: '2023-11-20',
      type: 'Received',
      material: 'Steel Reinforcement Bars',
      quantity: 50,
      project: 'Commercial Tower A1',
      requestedBy: 'John Smith',
      status: 'Completed'
    },
    {
      id: 'TRX-002',
      date: '2023-11-19',
      type: 'Issued',
      material: 'Portland Cement',
      quantity: 300,
      project: 'Residential Complex B2',
      requestedBy: 'Sarah Johnson',
      status: 'Completed'
    }
  ];

  const getStockStatusColor = (status) => {
    switch (status) {
      case 'Adequate':
        return 'bg-green-100 text-green-800';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTransactionTypeColor = (type) => {
    switch (type) {
      case 'Received':
        return 'text-green-600';
      case 'Issued':
        return 'text-blue-600';
      case 'Returned':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t('modules.inventory')}</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage inventory levels and material transactions
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Items</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">1,248</p>
          <p className="mt-1 text-sm text-blue-600">Across all categories</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Value</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">$2.4M</p>
          <p className="mt-1 text-sm text-green-600">Current inventory value</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Low Stock Items</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">28</p>
          <p className="mt-1 text-sm text-yellow-600">Need reordering</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Today's Transactions</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">45</p>
          <p className="mt-1 text-sm text-gray-600">12 pending approvals</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4 px-6 py-4">
            <button
              onClick={() => setActiveTab('materials')}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'materials'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Materials
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'transactions'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Transactions
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'materials' && (
            <div>
              {/* Actions Bar */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    placeholder="Search materials..."
                    className="form-input rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <select className="form-select rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option>All Categories</option>
                    <option>Construction Materials</option>
                    <option>Electrical</option>
                    <option>Plumbing</option>
                  </select>
                </div>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-md text-sm">
                    Export
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Add Material
                  </button>
                </div>
              </div>

              {/* Materials Table */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Code
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Material
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      In Stock
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
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
                  {materials.map((material) => (
                    <tr key={material.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {material.code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {material.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {material.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {material.inStock} {material.unit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${material.value.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {material.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStockStatusColor(material.status)}`}>
                          {material.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div>
              {/* Actions Bar */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    className="form-input rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <select className="form-select rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option>All Types</option>
                    <option>Received</option>
                    <option>Issued</option>
                    <option>Returned</option>
                  </select>
                </div>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-md text-sm">
                    Generate Report
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    New Transaction
                  </button>
                </div>
              </div>

              {/* Transactions Table */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Material
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {transaction.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium ${getTransactionTypeColor(transaction.type)}`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.material}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.project}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Inventory;
