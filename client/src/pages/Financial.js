import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Financial() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');

  // Sample financial data
  const financialSummary = {
    totalRevenue: 12500000,
    totalExpenses: 8750000,
    netProfit: 3750000,
    accountsReceivable: 2800000,
    accountsPayable: 1500000,
    cashBalance: 4200000
  };

  const recentTransactions = [
    {
      id: 'TRX-001',
      date: '2023-11-20',
      type: 'Payment Received',
      description: 'Commercial Tower A1 - Milestone Payment',
      amount: 750000,
      status: 'Completed'
    },
    {
      id: 'TRX-002',
      date: '2023-11-19',
      type: 'Supplier Payment',
      description: 'Steel Suppliers Co. - PO-2023-001',
      amount: -250000,
      status: 'Completed'
    },
    {
      id: 'TRX-003',
      date: '2023-11-18',
      type: 'Subcontractor Payment',
      description: 'Elite MEP Services - November Progress',
      amount: -180000,
      status: 'Pending'
    }
  ];

  const pendingApprovals = [
    {
      id: 'REQ-001',
      type: 'Purchase Invoice',
      vendor: 'MEP Equipment Ltd.',
      amount: 120000,
      submittedBy: 'John Smith',
      submittedDate: '2023-11-20',
      status: 'Pending Approval'
    },
    {
      id: 'REQ-002',
      type: 'Expense Claim',
      vendor: 'Site Operations',
      amount: 15000,
      submittedBy: 'Sarah Johnson',
      submittedDate: '2023-11-19',
      status: 'Under Review'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Under Review':
        return 'bg-blue-100 text-blue-800';
      case 'Pending Approval':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAmountColor = (amount) => {
    return amount >= 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t('modules.financial')}</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage financial operations and reporting
        </p>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Revenue & Profit */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Revenue & Profit</h3>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-lg font-bold text-gray-900">
                ${financialSummary.totalRevenue.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Net Profit</p>
              <p className="text-lg font-bold text-green-600">
                ${financialSummary.netProfit.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${(financialSummary.netProfit / financialSummary.totalRevenue) * 100}%` }}
              ></div>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {((financialSummary.netProfit / financialSummary.totalRevenue) * 100).toFixed(1)}% Profit Margin
            </p>
          </div>
        </div>

        {/* Accounts */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Accounts</h3>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Receivables</p>
              <p className="text-lg font-bold text-blue-600">
                ${financialSummary.accountsReceivable.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Payables</p>
              <p className="text-lg font-bold text-red-600">
                ${financialSummary.accountsPayable.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Net Position</span>
              <span className="font-medium text-gray-900">
                ${(financialSummary.accountsReceivable - financialSummary.accountsPayable).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Cash Position */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Cash Position</h3>
          <div className="mt-2">
            <p className="text-2xl font-bold text-gray-900">
              ${financialSummary.cashBalance.toLocaleString()}
            </p>
            <p className="mt-1 text-sm text-green-600">+8.5% from last month</p>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Available Credit</span>
              <span>$2,500,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4 px-6 py-4">
            {['overview', 'transactions', 'approvals', 'reports'].map((tab) => (
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

        {/* Content */}
        <div className="p-6">
          {activeTab === 'transactions' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Recent Transactions</h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  New Transaction
                </button>
              </div>
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
                      Description
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {transaction.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.description}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getAmountColor(transaction.amount)}`}>
                        ${Math.abs(transaction.amount).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'approvals' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Pending Approvals</h3>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-md text-sm">
                    Bulk Approve
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Review Selected
                  </button>
                </div>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Request ID
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vendor/Description
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted By
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
                  {pendingApprovals.map((approval) => (
                    <tr key={approval.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {approval.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {approval.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {approval.vendor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${approval.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {approval.submittedBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(approval.status)}`}>
                          {approval.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Review</button>
                        <button className="text-green-600 hover:text-green-900 mr-3">Approve</button>
                        <button className="text-red-600 hover:text-red-900">Reject</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Reports</h3>
                <ul className="space-y-3">
                  <li>
                    <button className="w-full text-left px-4 py-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                      <div className="text-sm font-medium text-gray-900">Balance Sheet</div>
                      <div className="text-sm text-gray-500">Current financial position</div>
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                      <div className="text-sm font-medium text-gray-900">Profit & Loss Statement</div>
                      <div className="text-sm text-gray-500">Revenue and expenses summary</div>
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                      <div className="text-sm font-medium text-gray-900">Cash Flow Statement</div>
                      <div className="text-sm text-gray-500">Cash movement analysis</div>
                    </button>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Project Reports</h3>
                <ul className="space-y-3">
                  <li>
                    <button className="w-full text-left px-4 py-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                      <div className="text-sm font-medium text-gray-900">Project Profitability</div>
                      <div className="text-sm text-gray-500">Project-wise financial performance</div>
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                      <div className="text-sm font-medium text-gray-900">Budget vs Actual</div>
                      <div className="text-sm text-gray-500">Cost comparison analysis</div>
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                      <div className="text-sm font-medium text-gray-900">Expense Analysis</div>
                      <div className="text-sm text-gray-500">Detailed expense breakdown</div>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Financial;
