import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import UploadDocumentModal from '../components/UploadDocumentModal';
import AddTaskModal from '../components/AddTaskModal';

function TechnicalOffice() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('documents');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Site Survey Report', type: 'PDF', date: '2023-11-20', status: 'Approved', content: 'Site survey report content...' },
    { id: 2, name: 'Construction Drawings', type: 'CAD', date: '2023-11-19', status: 'Under Review', content: 'Construction drawings content...' },
    { id: 3, name: 'Material Specifications', type: 'DOC', date: '2023-11-18', status: 'Pending', content: 'Material specifications content...' }
  ]);
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Review structural designs', assignee: 'John Doe', deadline: '2023-11-25', priority: 'High', description: 'Review and approve structural designs for Phase 1' },
    { id: 2, title: 'Update site plans', assignee: 'Jane Smith', deadline: '2023-11-27', priority: 'Medium', description: 'Update site plans with recent changes' },
    { id: 3, title: 'Prepare technical report', assignee: 'Mike Johnson', deadline: '2023-11-30', priority: 'Low', description: 'Prepare monthly technical progress report' }
  ]);

  // Document handlers
  const handleView = (doc) => {
    setSelectedDocument(doc);
  };

  const handleDelete = (docId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(doc => doc.id !== docId));
      if (selectedDocument?.id === docId) {
        setSelectedDocument(null);
      }
    }
  };

  // Task handlers
  const handleAddTask = (taskData) => {
    const newTask = {
      id: tasks.length + 1,
      ...taskData
    };
    setTasks([...tasks, newTask]);
    setIsAddTaskModalOpen(false);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsAddTaskModalOpen(true);
  };

  const handleUpdateTask = (taskData) => {
    setTasks(tasks.map(task => 
      task.id === editingTask.id ? { ...taskData, id: task.id } : task
    ));
    setEditingTask(null);
    setIsAddTaskModalOpen(false);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t('modules.technical_office')}</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage technical documentation and tasks
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <nav className="flex space-x-4" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('documents')}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === 'documents'
                ? 'bg-black text-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Documents
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === 'tasks'
                ? 'bg-black text-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Tasks
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow">
        {activeTab === 'documents' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Technical Documents</h2>
              <button 
                onClick={() => setIsUploadModalOpen(true)}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
              >
                Upload Document
              </button>

              <UploadDocumentModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                onUpload={(formData) => {
                  const newDocument = {
                    id: documents.length + 1,
                    name: formData.name,
                    type: formData.type,
                    date: new Date().toISOString().split('T')[0],
                    status: 'Pending',
                    content: formData.content || 'No content available'
                  };
                  setDocuments([...documents, newDocument]);
                }}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Documents List */}
              <div className="lg:col-span-2 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Document Name
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
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
                    {documents.map((doc) => (
                      <tr key={doc.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {doc.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {doc.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {doc.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            doc.status === 'Approved' ? 'bg-green-100 text-green-800' :
                            doc.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {doc.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button 
                            onClick={() => handleView(doc)}
                            className="text-black hover:text-gray-700 mr-3 font-medium"
                          >
                            View
                          </button>
                          <button 
                            onClick={() => handleDelete(doc.id)}
                            className="text-red-600 hover:text-red-900 font-medium"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Document Preview */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-4 h-full">
                  {selectedDocument ? (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {selectedDocument.name}
                      </h3>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Type:</span> {selectedDocument.type}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Date:</span> {selectedDocument.date}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Status:</span> {selectedDocument.status}
                        </p>
                      </div>
                      <div className="border-t border-gray-200 pt-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Content Preview</h4>
                        <p className="text-sm text-gray-600">
                          {selectedDocument.content}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      Select a document to view details
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Technical Tasks</h2>
              <button 
                onClick={() => {
                  setEditingTask(null);
                  setIsAddTaskModalOpen(true);
                }}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
              >
                Add Task
              </button>
            </div>

            <AddTaskModal
              isOpen={isAddTaskModalOpen}
              onClose={() => {
                setIsAddTaskModalOpen(false);
                setEditingTask(null);
              }}
              onAdd={editingTask ? handleUpdateTask : handleAddTask}
              editTask={editingTask}
            />

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Task
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assignee
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deadline
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tasks.map((task) => (
                    <tr key={task.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {task.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {task.assignee}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {task.deadline}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          task.priority === 'High' ? 'bg-red-100 text-red-800' :
                          task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button 
                          onClick={() => handleEditTask(task)}
                          className="text-black hover:text-gray-700 mr-3 font-medium"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-red-600 hover:text-red-900 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TechnicalOffice;
