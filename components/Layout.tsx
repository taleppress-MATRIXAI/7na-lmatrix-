import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import Header from './Header';
import MobileMenu from './MobileMenu';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 768);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <div className="flex flex-col md:flex-row h-screen font-sans text-dark-text bg-light-bg">
      {isDesktop ? <Sidebar /> : 
        <>
          <Header onMenuClick={() => setMenuOpen(true)} />
          <MobileMenu isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} />
          <BottomNav />
        </>
      }
      <main className="flex-1 overflow-y-auto pt-28 pb-20 md:pt-0 md:pb-0">
        <div className="p-4 sm:p-6 lg:p-8">
            {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;