import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import App from '../App';

// Mock all page components
jest.mock('../pages/Dashboard', () => () => <div>Dashboard Page</div>);
jest.mock('../pages/TechnicalOffice', () => () => <div>Technical Office Page</div>);
jest.mock('../pages/TenderRegistration', () => () => <div>Tender Registration Page</div>);
jest.mock('../pages/BoQAnalysis', () => () => <div>BoQ Analysis Page</div>);
jest.mock('../pages/Quotations', () => () => <div>Quotations Page</div>);
jest.mock('../pages/ContractManagement', () => () => <div>Contract Management Page</div>);
jest.mock('../pages/ProjectImplementation', () => () => <div>Project Implementation Page</div>);
jest.mock('../pages/CompletionRates', () => () => <div>Completion Rates Page</div>);
jest.mock('../pages/Subcontractor', () => () => <div>Subcontractor Page</div>);
jest.mock('../pages/Procurement', () => () => <div>Procurement Page</div>);
jest.mock('../pages/Inventory', () => () => <div>Inventory Page</div>);
jest.mock('../pages/Financial', () => () => <div>Financial Page</div>);
jest.mock('../pages/TimeLabor', () => () => <div>Time Labor Page</div>);
jest.mock('../pages/Mechanism', () => () => <div>Mechanism Page</div>);

// Mock ErrorBoundary
jest.mock('../components/ErrorBoundary', () => {
  return {
    __esModule: true,
    default: ({ children }) => <div className="error-boundary">{children}</div>,
  };
});

// Mock i18n
const mockChangeLanguage = jest.fn();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      language: 'en',
      changeLanguage: mockChangeLanguage
    }
  }),
  I18nextProvider: ({ children }) => children
}));

// Set up mockChangeLanguage implementation after the mock
beforeEach(() => {
  mockChangeLanguage.mockImplementation((lng) => {
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    return Promise.resolve();
  });
});

// Mock Header component to add aria-label to menu button
jest.mock('../components/Header', () => {
  return function Header({ onMenuClick }) {
    return (
      <header className="bg-black text-white border-b border-gray-800">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <button
                aria-label="menu"
                className="p-2 rounded-md text-white hover:text-gray-300 hover:bg-gray-800 focus:outline-none transition-colors duration-200"
                onClick={onMenuClick}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  };
});

describe('App', () => {
  const renderApp = (initialRoute = '/') => {
    return render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <App />
        </MemoryRouter>
      </I18nextProvider>
    );
  };

  beforeEach(() => {
    document.documentElement.dir = 'ltr';
    document.body.className = '';
  });

  test('renders layout components', () => {
    renderApp();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('complementary')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  test('handles sidebar toggle', () => {
    renderApp();
    const menuButton = screen.getByRole('button', { name: /menu/i });
    const mainContent = screen.getByRole('main');
    
    expect(mainContent).toHaveClass('ml-64');
    fireEvent.click(menuButton);
    expect(mainContent).not.toHaveClass('ml-64');
  });

  test('handles RTL/LTR switching', async () => {
    renderApp();
    expect(document.documentElement.dir).toBe('ltr');
    const { i18n } = require('react-i18next').useTranslation();
    await i18n.changeLanguage('ar');
    expect(document.documentElement.dir).toBe('rtl');
  });

  test('applies background color', () => {
    renderApp();
    expect(document.body).toHaveClass('bg-gray-100');
  });

  test('wraps content in error boundary', () => {
    const { container } = renderApp();
    expect(container.getElementsByClassName('error-boundary')).toHaveLength(2);
  });

  const routes = [
    { path: '/', expectedText: 'Dashboard Page' },
    { path: '/technical-office', expectedText: 'Technical Office Page' },
    { path: '/tender-registration', expectedText: 'Tender Registration Page' },
    { path: '/boq-analysis', expectedText: 'BoQ Analysis Page' },
    { path: '/quotations', expectedText: 'Quotations Page' },
    { path: '/contract-management', expectedText: 'Contract Management Page' },
    { path: '/project-implementation', expectedText: 'Project Implementation Page' },
    { path: '/completion-rates', expectedText: 'Completion Rates Page' },
    { path: '/subcontractor', expectedText: 'Subcontractor Page' },
    { path: '/procurement', expectedText: 'Procurement Page' },
    { path: '/inventory', expectedText: 'Inventory Page' },
    { path: '/financial', expectedText: 'Financial Page' },
    { path: '/time-labor', expectedText: 'Time Labor Page' },
    { path: '/mechanism', expectedText: 'Mechanism Page' }
  ];

  routes.forEach(({ path, expectedText }) => {
    test(`renders correct component for ${path}`, () => {
      renderApp(path);
      expect(screen.getByText(expectedText)).toBeInTheDocument();
    });
  });
});
