import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Procurement() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('requisitions');

  // Sample procurement data
  const requisitions = [
    {
      id: 'PR-2023-001',
      projectName: 'Commercial Tower A1',
      requestedBy: 'John Smith',
      department: 'Construction',
      date: '2023-11-20',
      status: 'Pending Approval',
      priority: 'High',
      items: [
        { name: 'Steel Reinforcement', quantity: 5000, unit: 'kg', estimatedCost: 25000 },
        { name: 'Concrete Mix', quantity: 100, unit: 'cubic meters', estimatedCost: 15000 }
      ]
    },
    {
      id: 'PR-2023-002',
      projectName: 'Residential Complex B2',
      requestedBy: 'Sarah Johnson',
      department: 'MEP',
      date: '2023-11-19',
      status: 'Approved',
      priority: 'Medium',
      items: [
        { name: 'HVAC Units', quantity: 20, unit: 'pieces', estimatedCost: 40000 },
        { name: 'Electrical Cables', quantity: 1000, unit: 'meters', estimatedCost: 8000 }
      ]
    }
  ];

  const purchaseOrders = [
    {
      id: 'PO-2023-001',
      supplier: 'Steel Suppliers Co.',
      date: '2023-11-18',
      status: 'Delivered',
      totalValue: 75000,
      paymentStatus: 'Paid',
      deliveryDate: '2023-11-25'
    },
    {
      id: 'PO-2023-002',
      supplier: 'MEP Equipment Ltd.',
      date: '2023-11-17',
      status: 'In Transit',
      totalValue: 120000,
      paymentStatus: 'Pending',
      deliveryDate: '2023-12-01'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Pending Approval':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Delivered':
        return 'bg-blue-100 text-blue-800';
      case 'In Transit':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-red-600';
      case 'Medium':
        return 'text-yellow-600';
      case 'Low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {t('modules.procurement')}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage purchase requisitions, orders, and supplier relationships
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Pending Requisitions</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">8</p>
          <p className="mt-1 text-sm text-yellow-600">3 high priority</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Active Orders</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">12</p>
          <p className="mt-1 text-sm text-blue-600">$450K total value</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Delivery Status</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">85%</p>
          <p className="mt-1 text-sm text-green-600">On-time delivery</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Budget Utilized</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">68%</p>
          <p className="mt-1 text-sm text-gray-600">Of annual budget</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4 px-6 py-4">
            <button
              onClick={() => setActiveTab('requisitions')}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'requisitions'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Purchase Requisitions
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'orders'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Purchase Orders
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'requisitions' && (
            <div>
              {/* Actions Bar */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    placeholder="Search requisitions..."
                    className="form-input rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <select className="form-select rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option>All Status</option>
                    <option>Pending Approval</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                  </select>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  New Requisition
                </button>
              </div>

              {/* Requisitions List */}
              {requisitions.map((req) => (
                <div key={req.id} className="mb-6 border rounded-lg">
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{req.id}</h3>
                        <p className="text-sm text-gray-600">{req.projectName}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(req.priority)}`}>
                          {req.priority} Priority
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(req.status)}`}>
                          {req.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-4">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Requested By</p>
                        <p className="text-sm font-medium text-gray-900">{req.requestedBy}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Department</p>
                        <p className="text-sm font-medium text-gray-900">{req.department}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="text-sm font-medium text-gray-900">{req.date}</p>
                      </div>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Est. Cost ($)</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {req.items.map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{item.quantity}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{item.unit}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">${item.estimatedCost.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              {/* Actions Bar */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    placeholder="Search orders..."
                    className="form-input rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <select className="form-select rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option>All Status</option>
                    <option>In Transit</option>
                    <option>Delivered</option>
                  </select>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Create Order
                </button>
              </div>

              {/* Orders Table */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      PO Number
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Supplier
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {purchaseOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.supplier}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${order.totalValue.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.paymentStatus}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                        <button className="text-blue-600 hover:text-blue-900">Track</button>
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

export default Procurement;
