import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { BellIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
              <BellIcon className="h-6 w-6" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <div className="flex items-center space-x-3">
                <div className="text-sm">
                  <p className="font-medium text-gray-700">{user?.companyName}</p>
                  <p className="text-gray-500 text-xs">{user?.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-red-600 hover:text-red-500"
                >
                  로그아웃
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;