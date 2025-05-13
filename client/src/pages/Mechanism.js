import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Mechanism() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('equipment');

  // Sample equipment data
  const equipment = [
    {
      id: 'EQP-001',
      name: 'Tower Crane',
      model: 'Liebherr 280 EC-H',
      location: 'Commercial Tower A1',
      status: 'Operational',
      utilization: 85,
      lastMaintenance: '2023-11-15',
      nextMaintenance: '2023-12-15',
      operator: 'John Smith',
      hoursUsed: 2450
    },
    {
      id: 'EQP-002',
      name: 'Excavator',
      model: 'CAT 320',
      location: 'Residential Complex B2',
      status: 'Under Maintenance',
      utilization: 0,
      lastMaintenance: '2023-11-20',
      nextMaintenance: '2023-11-22',
      operator: 'Mike Johnson',
      hoursUsed: 1850
    }
  ];

  // Sample maintenance records
  const maintenanceRecords = [
    {
      id: 'MNT-001',
      equipmentId: 'EQP-002',
      equipmentName: 'Excavator',
      type: 'Preventive',
      date: '2023-11-20',
      description: 'Regular service and oil change',
      technician: 'Robert Wilson',
      cost: 1200,
      status: 'In Progress'
    },
    {
      id: 'MNT-002',
      equipmentId: 'EQP-001',
      equipmentName: 'Tower Crane',
      type: 'Inspection',
      date: '2023-11-15',
      description: 'Monthly safety inspection',
      technician: 'David Brown',
      cost: 800,
      status: 'Completed'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Operational':
        return 'bg-green-100 text-green-800';
      case 'Under Maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'Out of Service':
        return 'bg-red-100 text-red-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUtilizationColor = (utilization) => {
    if (utilization >= 80) return 'bg-green-600';
    if (utilization >= 60) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t('modules.mechanism')}</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage construction equipment and machinery
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Equipment</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">24</p>
          <p className="mt-1 text-sm text-blue-600">$4.2M total value</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Operational</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">20</p>
          <p className="mt-1 text-sm text-green-600">83% availability</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Under Maintenance</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">3</p>
          <p className="mt-1 text-sm text-yellow-600">Expected completion in 2 days</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Utilization Rate</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">78%</p>
          <p className="mt-1 text-sm text-gray-600">Last 30 days average</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4 px-6 py-4">
            {['equipment', 'maintenance', 'operators', 'reports'].map((tab) => (
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
          {activeTab === 'equipment' && (
            <div>
              {/* Actions Bar */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    placeholder="Search equipment..."
                    className="form-input rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <select className="form-select rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option>All Status</option>
                    <option>Operational</option>
                    <option>Under Maintenance</option>
                    <option>Out of Service</option>
                  </select>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Add Equipment
                </button>
              </div>

              {/* Equipment Table */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Equipment
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Utilization
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Maintenance
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Operator
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {equipment.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-600">
                                {item.name[0]}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-500">{item.model}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div
                              className={`h-2.5 rounded-full ${getUtilizationColor(item.utilization)}`}
                              style={{ width: `${item.utilization}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-500">{item.utilization}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Last: {item.lastMaintenance}</div>
                        <div className="text-sm text-gray-500">Next: {item.nextMaintenance}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.operator}
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
          )}

          {activeTab === 'maintenance' && (
            <div>
              {/* Actions Bar */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    placeholder="Search maintenance records..."
                    className="form-input rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <select className="form-select rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option>All Types</option>
                    <option>Preventive</option>
                    <option>Corrective</option>
                    <option>Inspection</option>
                  </select>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Schedule Maintenance
                </button>
              </div>

              {/* Maintenance Records Table */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Equipment
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Technician
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cost
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
                  {maintenanceRecords.map((record) => (
                    <tr key={record.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {record.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{record.equipmentName}</div>
                        <div className="text-sm text-gray-500">{record.equipmentId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.technician}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${record.cost.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                        <button className="text-blue-600 hover:text-blue-900">Update</button>
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

export default Mechanism;
