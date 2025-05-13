import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Header({ onMenuClick }) {
  const { t, i18n } = useTranslation();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  // Sample notifications
  const notifications = [
    {
      id: 1,
      type: 'info',
      message: 'New tender submission deadline approaching',
      time: '5 minutes ago'
    },
    {
      id: 2,
      type: 'warning',
      message: 'Project XYZ is behind schedule',
      time: '1 hour ago'
    },
    {
      id: 3,
      type: 'success',
      message: 'Contract ABC has been approved',
      time: '2 hours ago'
    }
  ];

  const getNotificationColor = (type) => {
    switch (type) {
      case 'info':
        return 'bg-blue-50 text-blue-800';
      case 'warning':
        return 'bg-yellow-50 text-yellow-800';
      case 'success':
        return 'bg-green-50 text-green-800';
      default:
        return 'bg-gray-50 text-gray-800';
    }
  };

  return (
    <header className="bg-black text-white border-b border-gray-800">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left section */}
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-white hover:text-gray-300 hover:bg-gray-800 focus:outline-none transition-colors duration-200"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-white tracking-tight">{t('app_title')}</h1>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-6">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 rounded-md text-sm font-medium text-white border border-white hover:bg-white hover:text-black transition-colors duration-200"
            >
              {i18n.language === 'en' ? 'العربية' : 'English'}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-md text-white hover:text-gray-300 hover:bg-gray-800 focus:outline-none transition-colors duration-200"
              >
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                    </div>
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 ${getNotificationColor(notification.type)}`}
                      >
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                    <div className="px-4 py-3 border-t border-gray-200">
                      <button className="text-sm text-black hover:text-gray-600 transition-colors duration-200">
                        View all notifications
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-3 p-2 rounded-md text-white hover:bg-gray-800 transition-colors duration-200"
              >
                <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                  <span className="text-sm font-medium text-black">JS</span>
                </div>
                <span className="text-sm font-medium text-white">John Smith</span>
              </button>

              {profileDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    <a
                      href="#profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Your Profile
                    </a>
                    <a
                      href="#settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Settings
                    </a>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
