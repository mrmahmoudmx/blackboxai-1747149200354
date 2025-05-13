import React from 'react';
import { useTranslation } from 'react-i18next';

function Dashboard() {
  const { t } = useTranslation();

  // Sample data for dashboard widgets
  const statistics = [
    { 
      id: 1, 
      title: 'Active Projects', 
      value: '12', 
      trend: '+2.5%',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    { 
      id: 2, 
      title: 'Pending Tenders', 
      value: '8', 
      trend: '+1.2%',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    { 
      id: 3, 
      title: 'Total Contracts', 
      value: '24', 
      trend: '+3.1%',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    { 
      id: 4, 
      title: 'Revenue (YTD)', 
      value: '$2.4M', 
      trend: '+15.3%',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const recentProjects = [
    { id: 1, name: 'Commercial Tower A1', status: 'In Progress', completion: '65%', statusColor: 'text-green-600' },
    { id: 2, name: 'Residential Complex B2', status: 'Planning', completion: '15%', statusColor: 'text-blue-600' },
    { id: 3, name: 'Infrastructure Project C3', status: 'On Hold', completion: '45%', statusColor: 'text-yellow-600' }
  ];

  const getProgressBarColor = (completion) => {
    const percent = parseInt(completion);
    if (percent >= 75) return 'bg-green-600';
    if (percent >= 40) return 'bg-blue-600';
    return 'bg-yellow-600';
  };

  return (
    <div className="p-6 animate-fade-in">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black tracking-tight">{t('modules.dashboard')}</h1>
        <p className="mt-2 text-sm text-gray-600">
          {t('dashboard.overview')}
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statistics.map((stat) => (
          <div key={stat.id} className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-black bg-opacity-5 rounded-lg">
                  <span className="text-black">{stat.icon}</span>
                </div>
                <span className={`text-sm font-medium ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
              <p className="mt-2 text-3xl font-bold text-black">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm mb-8">
        <div className="p-6">
          <h2 className="text-xl font-bold text-black mb-6">
            {t('dashboard.recent_projects')}
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {t('common.project_name')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {t('common.status')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {t('common.completion')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                      {project.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`${project.statusColor} font-medium`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-100 rounded-full h-1.5 mr-3">
                          <div
                            className={`${getProgressBarColor(project.completion)} h-1.5 rounded-full transition-all duration-500`}
                            style={{ width: project.completion }}
                          ></div>
                        </div>
                        <span className="font-medium">{project.completion}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-bold text-black mb-6">
            {t('dashboard.quick_actions')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors duration-200">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {t('dashboard.new_project')}
            </button>
            <button className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors duration-200">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {t('dashboard.create_tender')}
            </button>
            <button className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors duration-200">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {t('dashboard.generate_report')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
