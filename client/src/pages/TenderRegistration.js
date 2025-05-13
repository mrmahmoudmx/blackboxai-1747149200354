import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TenderModal from '../components/TenderModal';
import Toast from '../components/Toast';
import tenderService from '../services/tenderService';

function TenderRegistration() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('active');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTender, setEditingTender] = useState(null);
  const [selectedTender, setSelectedTender] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTenders();
  }, []);

  const fetchTenders = async () => {
    try {
      setLoading(true);
      const data = await tenderService.getAllTenders();
      setTenders(data);
    } catch (error) {
      showToast(error.message || 'Error fetching tenders', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTender = async (formData) => {
    try {
      const newTender = await tenderService.createTender(formData);
      setTenders([newTender, ...tenders]);
      showToast('Tender created successfully');
      setIsModalOpen(false);
    } catch (error) {
      showToast(error.message || 'Error creating tender', 'error');
    }
  };

  const handleEditTender = async (formData) => {
    try {
      const updatedTender = await tenderService.updateTender(editingTender.id, formData);
      setTenders(tenders.map(tender => 
        tender.id === editingTender.id ? updatedTender : tender
      ));
      setEditingTender(null);
      showToast('Tender updated successfully');
      setIsModalOpen(false);
    } catch (error) {
      showToast(error.message || 'Error updating tender', 'error');
    }
  };

  const handleDeleteTender = async (tenderId) => {
    try {
      if (window.confirm('Are you sure you want to delete this tender? This action cannot be undone.')) {
        await tenderService.deleteTender(tenderId);
        setTenders(tenders.filter(tender => tender.id !== tenderId));
        
        // Clean up related states
        if (selectedTender?.id === tenderId) {
          setSelectedTender(null);
        }
        if (editingTender?.id === tenderId) {
          setEditingTender(null);
          setIsModalOpen(false);
        }
        
        showToast('Tender deleted successfully');
      }
    } catch (error) {
      showToast(error.message || 'Error deleting tender', 'error');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTenders = tenders.filter(tender => {
    const matchesSearch = tender.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tender.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tender.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || tender.status === statusFilter;
    const matchesTab = (activeTab === 'active' && tender.status !== 'Completed') ||
                      (activeTab === 'completed' && tender.status === 'Completed') ||
                      (activeTab === 'draft' && tender.status === 'Draft');
    return matchesSearch && matchesStatus && matchesTab;
  });

  const stats = {
    active: tenders.filter(t => t.status !== 'Completed').length,
    pending: tenders.filter(t => t.status === 'Pending Review').length,
    successRate: '65%',
    totalValue: `$${tenders.reduce((sum, t) => sum + parseFloat(t.value.replace(/[^0-9.-]+/g, '')), 0).toFixed(1)}M`
  };

  return (
    <div className="p-6">
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      ) : (
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {t('modules.tender_registration')}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage tender submissions and direct orders
        </p>
      </div>

      <>
        {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Active Tenders</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">{stats.active}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Pending Review</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Success Rate</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">{stats.successRate}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Value</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">{stats.totalValue}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4 px-6 py-4" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'active'
                  ? 'bg-black text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Active Tenders
            </button>
            <button
              onClick={() => setActiveTab('draft')}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'draft'
                  ? 'bg-black text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Draft
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'completed'
                  ? 'bg-black text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Completed
            </button>
          </nav>
        </div>

        {/* Actions Bar */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex space-x-3">
              <input
                type="text"
                placeholder="Search tenders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              >
                <option value="All">All Statuses</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Draft">Draft</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <button 
              onClick={() => {
                setEditingTender(null);
                setIsModalOpen(true);
              }}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
            >
              New Tender
            </button>
          </div>
        </div>

        {/* Tenders Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submission Date
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
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
              {filteredTenders.map((tender) => (
                <tr key={tender.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {tender.projectName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {tender.reference}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {tender.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {tender.submissionDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {tender.value}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(tender.status)}`}>
                      {tender.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button 
                      onClick={() => {
                        setEditingTender(tender);
                        setIsModalOpen(true);
                      }}
                      className="text-black hover:text-gray-700 mr-3 font-medium"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => setSelectedTender(tender)}
                      className="text-black hover:text-gray-700 mr-3 font-medium"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => handleDeleteTender(tender.id)}
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

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {filteredTenders.length} entries
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-black text-white">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

        {/* Tender Modal */}
        <TenderModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTender(null);
          }}
          onSubmit={editingTender ? handleEditTender : handleAddTender}
          editTender={editingTender}
        />
      </>
      )}

      {/* View Tender Modal */}
      {selectedTender && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Tender Details</h3>
              <button 
                onClick={() => setSelectedTender(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-4">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Project Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedTender.projectName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Reference</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedTender.reference}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Client</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedTender.client}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Submission Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedTender.submissionDate}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Value</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedTender.value}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedTender.status)}`}>
                      {selectedTender.status}
                    </span>
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Description</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedTender.description}</dd>
                </div>
              </dl>
            </div>
            <div className="px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setSelectedTender(null)}
                className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TenderRegistration;
