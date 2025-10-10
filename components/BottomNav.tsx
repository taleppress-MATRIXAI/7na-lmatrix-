import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';

const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden z-50">
      <ul className="flex justify-around">
        {NAV_ITEMS.map((item) => (
          <li key={item.label} className="flex-1">
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center p-3 transition-all text-sm ${
                  isActive
                    ? 'text-primary-green'
                    : 'text-light-text hover:text-dark-text'
                }`
              }
            >
              <item.icon className="w-6 h-6 mb-1" />
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNav;