import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary-green rounded-full"></div>
        <h1 className="text-2xl font-bold text-dark-text">7NA LMATRIX</h1>
      </div>
      <nav className="flex-1 px-4 py-2">
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 my-1 rounded-lg transition-all text-lg font-medium ${
                    isActive
                      ? 'bg-primary-green text-white shadow-md'
                      : 'text-light-text hover:bg-green-50 hover:text-dark-text'
                  }`
                }
              >
                <item.icon className="w-6 h-6" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-400">&copy; 2024 7NA LMATRIX</p>
        <a href="https://t.me/talebpreneur" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline mt-1 block">
          Contact on Telegram
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
