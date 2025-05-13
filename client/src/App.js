import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ModalProvider } from './contexts/ModalContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ErrorBoundary from './components/ErrorBoundary';

// Import pages
import Dashboard from './pages/Dashboard';
import TechnicalOffice from './pages/TechnicalOffice';
import TenderRegistration from './pages/TenderRegistration';
import BoQAnalysis from './pages/BoQAnalysis';
import Quotations from './pages/Quotations';
import ContractManagement from './pages/ContractManagement';
import ProjectImplementation from './pages/ProjectImplementation';
import CompletionRates from './pages/CompletionRates';
import Subcontractor from './pages/Subcontractor';
import Procurement from './pages/Procurement';
import Inventory from './pages/Inventory';
import Financial from './pages/Financial';
import TimeLabor from './pages/TimeLabor';
import Mechanism from './pages/Mechanism';

function App() {
  const { i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Set document direction based on language
  React.useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    // Set background color for the entire app
    document.body.className = 'bg-gray-100';
  }, [i18n.language]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ModalProvider>
      <div className="min-h-screen bg-gray-100">
        <ErrorBoundary>
          <Header onMenuClick={toggleSidebar} />
          <div className="flex h-screen overflow-hidden pt-20">
            <Sidebar isOpen={sidebarOpen} />
            <main 
              className={`flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 transition-all duration-300 ease-in-out
              ${sidebarOpen ? 'ml-64' : ''} 
              ${i18n.language === 'ar' ? 'mr-64' : ''}`}
            >
              <div className="container mx-auto px-6 py-8">
                <ErrorBoundary>
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/technical-office" element={<TechnicalOffice />} />
                    <Route path="/tender-registration" element={<TenderRegistration />} />
                    <Route path="/boq-analysis" element={<BoQAnalysis />} />
                    <Route path="/quotations" element={<Quotations />} />
                    <Route path="/contract-management" element={<ContractManagement />} />
                    <Route path="/project-implementation" element={<ProjectImplementation />} />
                    <Route path="/completion-rates" element={<CompletionRates />} />
                    <Route path="/subcontractor" element={<Subcontractor />} />
                    <Route path="/procurement" element={<Procurement />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/financial" element={<Financial />} />
                    <Route path="/time-labor" element={<TimeLabor />} />
                    <Route path="/mechanism" element={<Mechanism />} />
                  </Routes>
                </ErrorBoundary>
              </div>
            </main>
          </div>
        </ErrorBoundary>
      </div>
    </ModalProvider>
  );
}

export default App;
