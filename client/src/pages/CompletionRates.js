import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function CompletionRates() {
  const { t } = useTranslation();
  const [activeView, setActiveView] = useState('completion');

  // Sample completion data
  const projectCompletions = [
    {
      id: 1,
      projectName: 'Commercial Tower A1',
      plannedProgress: 35,
      actualProgress: 25,
      variance: -10,
      lastUpdate: '2023-11-20',
      workItems: [
        { name: 'Foundation Works', planned: 100, actual: 90, unit: 'cubic meters' },
        { name: 'Structural Works', planned: 45, actual: 30, unit: 'floors' },
        { name: 'MEP Installation', planned: 20, actual: 15, unit: 'percentage' },
        { name: 'Interior Finishing', planned: 0, actual: 0, unit: 'percentage' }
      ]
    },
    {
      id: 2,
      projectName: 'Residential Complex B2',
      plannedProgress: 25,
      actualProgress: 28,
      variance: 3,
      lastUpdate: '2023-11-19',
      workItems: [
        { name: 'Site Preparation', planned: 100, actual: 100, unit: 'percentage' },
        { name: 'Foundation Works', planned: 80, actual: 85, unit: 'cubic meters' },
        { name: 'Structural Works', planned: 20, actual: 25, unit: 'floors' },
        { name: 'Utilities Installation', planned: 10, actual: 5, unit: 'percentage' }
      ]
    }
  ];

  const getVarianceColor = (variance) => {
    if (variance > 0) return 'text-green-600';
    if (variance < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getProgressBarColor = (planned, actual) => {
    if (actual >= planned) return 'bg-green-600';
    if (actual >= planned * 0.8) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {t('modules.completion_rates')}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Track project completion rates and work inventory
        </p>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Average Completion</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">26.5%</p>
          <p className="mt-1 text-sm text-blue-600">Across all projects</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">On Track Projects</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">5/8</p>
          <p className="mt-1 text-sm text-green-600">62.5% success rate</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Delayed Projects</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">3</p>
          <p className="mt-1 text-sm text-red-600">Requires attention</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Work Items</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">156</p>
          <p className="mt-1 text-sm text-gray-600">Total tracked items</p>
        </div>
      </div>

      {/* View Toggle */}
      <div className="mb-6">
        <div className="bg-gray-100 rounded-lg p-1 inline-flex">
          <button
            onClick={() => setActiveView('completion')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeView === 'completion'
                ? 'bg-white shadow text-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Completion Rates
          </button>
          <button
            onClick={() => setActiveView('inventory')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeView === 'inventory'
                ? 'bg-white shadow text-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Work Inventory
          </button>
        </div>
      </div>

      {/* Project Completion Cards */}
      {projectCompletions.map((project) => (
        <div key={project.id} className="bg-white rounded-lg shadow mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">{project.projectName}</h2>
              <span className="text-sm text-gray-500">Last updated: {project.lastUpdate}</span>
            </div>
          </div>

          <div className="p-6">
            {/* Overall Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-900">Overall Progress</h3>
                <span className={`text-sm font-medium ${getVarianceColor(project.variance)}`}>
                  {project.variance > 0 ? '+' : ''}{project.variance}% variance
                </span>
              </div>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      Actual Progress: {project.actualProgress}%
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold inline-block text-gray-600">
                      Planned Progress: {project.plannedProgress}%
                    </span>
                  </div>
                </div>
                <div className="flex h-2 mb-4 overflow-hidden bg-gray-200 rounded">
                  <div
                    className={`${getProgressBarColor(project.plannedProgress, project.actualProgress)} w-full`}
                    style={{ width: `${project.actualProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Work Items */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Work Items Progress</h3>
              <div className="space-y-4">
                {project.workItems.map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                        <p className="text-xs text-gray-500">Unit: {item.unit}</p>
                      </div>
                      <span className={`text-sm font-medium ${
                        item.actual >= item.planned ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.actual}% / {item.planned}%
                      </span>
                    </div>
                    <div className="relative pt-1">
                      <div className="flex h-2 overflow-hidden bg-gray-200 rounded">
                        <div
                          className={`${getProgressBarColor(item.planned, item.actual)} transition-all duration-300`}
                          style={{ width: `${item.actual}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                View Details
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                Update Progress
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CompletionRates;
