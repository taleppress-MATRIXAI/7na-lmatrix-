import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_ITEMS, MORE_NAV_ITEMS } from '../constants';
import { XIcon } from './icons/Icons';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>

      {/* Menu */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 flex items-center justify-between border-b">
          <div className="flex items-center space-x-3">
             <div className="w-10 h-10 bg-primary-green rounded-full"></div>
             <h1 className="text-2xl font-bold text-dark-text">7NA LMATRIX</h1>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <XIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-4 overflow-y-auto">
          <div>
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Menu</p>
            <ul className="mt-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.href}
                    onClick={onClose}
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
          </div>
          <div>
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">More</p>
            <ul className="mt-2">
              {MORE_NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.href}
                    onClick={onClose}
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
          </div>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <p className="text-xs text-gray-400 text-center">&copy; 2024 7NA LMATRIX</p>
          <a href="https://t.me/talebpreneur" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline mt-1 block text-center">
            Contact on Telegram
          </a>
        </div>
      </aside>
    </>
  );
};

export default MobileMenu;
