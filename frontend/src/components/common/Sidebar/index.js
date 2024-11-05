import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  ChartBarIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const navigation = [
    { name: '대시보드', icon: HomeIcon, href: '/dashboard' },
    { name: '상품 관리', icon: ShoppingBagIcon, href: '/products' },
    { name: '리포트', icon: ChartBarIcon, href: '/reports' },
    { name: '설정', icon: Cog6ToothIcon, href: '/settings' },
  ];

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-white border-r border-gray-200">
          {/* Logo */}
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <span className="text-xl font-bold text-primary-600">
                Smart Receipt Ads
              </span>
            </div>
            
            {/* Navigation */}
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <item.icon
                    className="mr-3 flex-shrink-0 h-6 w-6"
                    aria-hidden="true"
                  />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;