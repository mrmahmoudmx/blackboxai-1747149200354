import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function BoQAnalysis() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('materials');

  // Sample data for different categories
  const materials = [
    { id: 1, code: 'MAT-001', name: 'Cement', unit: 'Bags', quantity: 1500, unitPrice: 8.5, total: 12750 },
    { id: 2, code: 'MAT-002', name: 'Steel Bars', unit: 'Tons', quantity: 75, unitPrice: 850, total: 63750 },
    { id: 3, code: 'MAT-003', name: 'Bricks', unit: 'Pieces', quantity: 25000, unitPrice: 0.5, total: 12500 }
  ];

  const equipment = [
    { id: 1, code: 'EQP-001', name: 'Excavator', unit: 'Hours', quantity: 120, unitPrice: 75, total: 9000 },
    { id: 2, code: 'EQP-002', name: 'Concrete Mixer', unit: 'Days', quantity: 45, unitPrice: 150, total: 6750 },
    { id: 3, code: 'EQP-003', name: 'Crane', unit: 'Days', quantity: 30, unitPrice: 500, total: 15000 }
  ];

  const labor = [
    { id: 1, code: 'LAB-001', name: 'Skilled Worker', unit: 'Days', quantity: 500, unitPrice: 45, total: 22500 },
    { id: 2, code: 'LAB-002', name: 'Helper', unit: 'Days', quantity: 750, unitPrice: 25, total: 18750 },
    { id: 3, code: 'LAB-003', name: 'Site Engineer', unit: 'Months', quantity: 6, unitPrice: 2500, total: 15000 }
  ];

  const expenses = [
    { id: 1, code: 'EXP-001', name: 'Site Setup', unit: 'Lump Sum', quantity: 1, unitPrice: 5000, total: 5000 },
    { id: 2, code: 'EXP-002', name: 'Utilities', unit: 'Months', quantity: 6, unitPrice: 1200, total: 7200 },
    { id: 3, code: 'EXP-003', name: 'Insurance', unit: 'Months', quantity: 6, unitPrice: 2000, total: 12000 }
  ];

  const getActiveData = () => {
    switch (activeCategory) {
      case 'materials':
        return materials;
      case 'equipment':
        return equipment;
      case 'labor':
        return labor;
      case 'expenses':
        return expenses;
      default:
        return [];
    }
  };

  const calculateTotal = (data) => {
    return data.reduce((acc, item) => acc + item.total, 0);
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t('modules.boq_analysis')}</h1>
        <p className="mt-1 text-sm text-gray-600">
          Analyze and manage bill of quantities for materials, equipment, labor, and expenses
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Materials</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">${calculateTotal(materials).toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Equipment</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">${calculateTotal(equipment).toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Labor</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">${calculateTotal(labor).toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">${calculateTotal(expenses).toLocaleString()}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow">
        {/* Category Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4 px-6 py-4">
            {['materials', 'equipment', 'labor', 'expenses'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-2 text-sm font-medium rounded-md capitalize ${
                  activeCategory === category
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {category}
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
                placeholder="Search items..."
                className="form-input rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm">
                Filter
              </button>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm">
                Export Excel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Add Item
              </button>
            </div>
          </div>
        </div>

        {/* BoQ Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit Price ($)
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total ($)
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getActiveData().map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.quantity.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${item.unitPrice.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${item.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50">
                <td colSpan="5" className="px-6 py-4 text-sm font-medium text-gray-900">
                  Total
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  ${calculateTotal(getActiveData()).toLocaleString()}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing 1 to {getActiveData().length} of {getActiveData().length} entries
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

export default BoQAnalysis;
