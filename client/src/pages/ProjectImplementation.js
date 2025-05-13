import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useModal } from '../contexts/ModalContext';
import ProjectModal from '../components/ProjectModal';

function ProjectImplementation() {
  const { t } = useTranslation();
  const { openModal, closeModal } = useModal();
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Commercial Tower A1',
      location: 'Downtown Business District',
      startDate: '2023-10-01',
      endDate: '2024-12-31',
      budget: 15000000,
      spent: 3750000,
      progress: 25,
      status: 'On Track',
      phases: [
        { name: 'Foundation', progress: 90, status: 'Near Completion' },
        { name: 'Structure', progress: 30, status: 'In Progress' },
        { name: 'MEP Works', progress: 10, status: 'Just Started' },
        { name: 'Finishing', progress: 0, status: 'Not Started' }
      ]
    },
    {
      id: 2,
      name: 'Residential Complex B2',
      location: 'Suburban Area',
      startDate: '2023-11-15',
      endDate: '2024-08-30',
      budget: 8500000,
      spent: 1275000,
      progress: 15,
      status: 'Delayed',
      phases: [
        { name: 'Site Preparation', progress: 100, status: 'Completed' },
        { name: 'Foundation', progress: 45, status: 'In Progress' },
        { name: 'Structure', progress: 0, status: 'Not Started' },
        { name: 'Finishing', progress: 0, status: 'Not Started' }
      ]
    }
  ]);

  const handleSubmit = useCallback((formData) => {
    if (selectedProject) {
      // Edit existing project
      setProjects(prevProjects => 
        prevProjects.map(project => {
          if (project.id === selectedProject.id) {
            return {
              ...project,
              ...formData,
              id: project.id,
              phases: project.phases
            };
          }
          return project;
        })
      );
    } else {
      // Add new project
      setProjects(prevProjects => [
        ...prevProjects,
        {
          ...formData,
          id: prevProjects.length + 1,
          spent: 0,
          progress: 0,
          phases: []
        }
      ]);
    }
    closeModal();
    setSelectedProject(null);
  }, [selectedProject, closeModal]);

  const handleEditClick = useCallback((project) => {
    setSelectedProject(project);
    const modal = (
      <ProjectModal
        isOpen={true}
        onClose={() => {
          closeModal();
          setSelectedProject(null);
        }}
        onSubmit={handleSubmit}
        initialData={project}
      />
    );
    openModal(modal);
  }, [openModal, closeModal, handleSubmit]);

  const handleAddClick = useCallback(() => {
    setSelectedProject(null);
    const modal = (
      <ProjectModal
        isOpen={true}
        onClose={() => {
          closeModal();
          setSelectedProject(null);
        }}
        onSubmit={handleSubmit}
        initialData={null}
      />
    );
    openModal(modal);
  }, [openModal, closeModal, handleSubmit]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'On Track':
        return 'bg-green-100 text-green-800';
      case 'Delayed':
        return 'bg-red-100 text-red-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPhaseStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Near Completion':
        return 'bg-yellow-100 text-yellow-800';
      case 'Not Started':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {t('modules.project_implementation')}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Monitor and manage project implementation progress
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Active Projects</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">{projects.length}</p>
          <p className="mt-1 text-sm text-green-600">
            {projects.filter(p => p.status === 'On Track').length} on track
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Budget</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            ${(projects.reduce((sum, p) => sum + p.budget, 0) / 1000000).toFixed(1)}M
          </p>
          <p className="mt-1 text-sm text-blue-600">
            ${(projects.reduce((sum, p) => sum + p.spent, 0) / 1000000).toFixed(1)}M spent
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Avg. Progress</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)}%
          </p>
          <p className="mt-1 text-sm text-yellow-600">+5% this month</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Upcoming Milestones</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {projects.reduce((sum, p) => sum + p.phases.filter(phase => phase.status === 'Not Started').length, 0)}
          </p>
          <p className="mt-1 text-sm text-gray-600">Next 30 days</p>
        </div>
      </div>

      {/* Project Cards */}
      {projects.map((project) => (
        <div key={project.id} className="bg-white rounded-lg shadow mb-6">
          {/* Project Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{project.name}</h2>
                <p className="text-sm text-gray-600">{project.location}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>
          </div>

          {/* Project Details */}
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Timeline</h4>
                <p className="mt-1 text-sm text-gray-900">
                  {project.startDate} - {project.endDate}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Budget</h4>
                <p className="mt-1 text-sm text-gray-900">
                  ${project.budget.toLocaleString()} 
                  <span className="text-gray-500">
                    (${project.spent.toLocaleString()} spent)
                  </span>
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Overall Progress</h4>
                <div className="mt-1 flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2.5 mr-2">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-900">{project.progress}%</span>
                </div>
              </div>
            </div>

            {/* Phase Progress */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Phase Progress</h3>
              <div className="space-y-4">
                {project.phases.map((phase, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium text-gray-900">{phase.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPhaseStatusColor(phase.status)}`}>
                        {phase.status}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${phase.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500">{phase.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => handleEditClick(project)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
              >
                Edit Project
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

      {/* Add Project Button */}
      <div className="mt-6">
        <button 
          onClick={handleAddClick}
          className="w-full px-4 py-3 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Project
        </button>
      </div>
    </div>
  );
}

export default ProjectImplementation;
