import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log the error to console (in production, you might want to log to an error tracking service)
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
                <svg 
                  className="w-6 h-6 text-red-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              
              <h3 className="mb-4 text-xl font-semibold text-center text-gray-900">
                Something went wrong
              </h3>
              
              <p className="mb-4 text-center text-gray-600">
                We apologize for the inconvenience. Please try reloading the page or contact support if the problem persists.
              </p>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mb-4 p-4 bg-gray-100 rounded-md overflow-auto">
                  <p className="text-sm font-mono text-gray-700">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <pre className="mt-2 text-xs font-mono text-gray-600">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              )}

              <div className="flex justify-center space-x-3">
                <button
                  onClick={this.handleReload}
                  className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200"
                >
                  Reload Page
                </button>
                <a
                  href="/"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200"
                >
                  Go to Homepage
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
