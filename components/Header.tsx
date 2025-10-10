import React from 'react';
import { MenuIcon, SearchIcon } from './icons/Icons';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-40 border-b border-gray-200">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <button onClick={onMenuClick} className="text-gray-600 p-1">
            <MenuIcon className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-dark-text">7NA LMATRIX</h1>
          <div className="w-8"></div> {/* Spacer */}
        </div>
        <div className="mt-4 relative">
          <input
            type="text"
            placeholder="Quick find: tags, strategy & more"
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm focus:ring-primary-green focus:border-primary-green"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;